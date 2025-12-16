import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Registrar nuevo usuario
   */
  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);

    // Crear objeto sin campos sensibles
    const resultado = {
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      username: user.username,
      email: user.email,
      telefono: user.telefono,
      direccion: user.direccion,
      rol: user.rol,
      fecha_creacion: user.fecha_creacion,
    };

    return {
      mensaje: 'Usuario registrado exitosamente',
      usuario: resultado,
    };
  }

  /**
   * Login de usuario con generación de tokens
   */
  async login(loginDto: LoginDto) {
    // Buscar usuario
    const user = await this.usersService.findByUsername(loginDto.username);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar si el usuario está bloqueado
    const isBlocked = await this.usersService.isUserBlocked(user.id);
    if (isBlocked && user.bloqueado_hasta) {
      const minutosRestantes = Math.ceil(
        (user.bloqueado_hasta.getTime() - Date.now()) / 60000,
      );
      throw new UnauthorizedException(
        `Usuario bloqueado temporalmente. Intente nuevamente en ${minutosRestantes} minutos`,
      );
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      // Incrementar intentos fallidos
      await this.usersService.incrementFailedAttempts(user.id);

      const attemptsLeft = 5 - (user.intentos_fallidos + 1);
      if (attemptsLeft > 0) {
        throw new UnauthorizedException(
          `Credenciales inválidas. Le quedan ${attemptsLeft} intentos`,
        );
      } else {
        throw new UnauthorizedException(
          'Cuenta bloqueada por 15 minutos debido a múltiples intentos fallidos',
        );
      }
    }

    // Resetear intentos fallidos
    await this.usersService.resetFailedAttempts(user.id);

    // Actualizar último acceso
    await this.usersService.updateLastAccess(user.id);

    // Generar tokens
    const tokens = await this.generateTokens(user.id, user.username, user.rol);

    // Guardar refresh token hasheado
    await this.usersService.updateRefreshToken(user.id, tokens.refresh_token);

    // Crear objeto sin campos sensibles
    const userWithoutPassword = {
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      username: user.username,
      email: user.email,
      telefono: user.telefono,
      direccion: user.direccion,
      rol: user.rol,
      fecha_creacion: user.fecha_creacion,
      ultimo_acceso: user.ultimo_acceso,
    };

    return {
      mensaje: 'Inicio de sesión exitoso',
      ...tokens,
      usuario: userWithoutPassword,
    };
  }

  /**
   * Cerrar sesión (invalidar refresh token)
   */
  async logout(userId: number) {
    await this.usersService.updateRefreshToken(userId, null);
    return {
      mensaje: 'Sesión cerrada exitosamente',
    };
  }

  /**
   * Refrescar access token usando refresh token
   */
  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.findById(userId);

    if (!user || !user.refresh_token) {
      throw new UnauthorizedException('Acceso denegado');
    }

    // Verificar refresh token
    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refresh_token,
    );

    if (!refreshTokenMatches) {
      throw new UnauthorizedException('Refresh token inválido');
    }

    // Generar nuevos tokens
    const tokens = await this.generateTokens(user.id, user.username, user.rol);

    // Actualizar refresh token
    await this.usersService.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  /**
   * Generar access token y refresh token
   */
  private async generateTokens(userId: number, username: string, rol: string) {
    const payload = {
      sub: userId,
      username: username,
      rol: rol,
    };

    const [accessToken, refreshToken] = await Promise.all([
      // Access Token (15 minutos)
      this.jwtService.signAsync(payload, {
        secret:
          this.configService.get<string>('JWT_SECRET') ||
          'chpc-secret-key-2025',
        expiresIn: '15m',
      }),
      // Refresh Token (7 días)
      this.jwtService.signAsync(payload, {
        secret:
          this.configService.get<string>('JWT_REFRESH_SECRET') ||
          'chpc-refresh-secret-2025',
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  /**
   * Validar usuario para JWT Strategy
   */
  async validateUser(userId: number) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    return user;
  }
}
