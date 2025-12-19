import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../auth/roles.enum';

@Controller('usuarios')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Obtener perfil del usuario autenticado
   */
  @UseGuards(JwtAuthGuard)
  @Get('perfil')
  async getProfile(@Request() req) {
    const user = await this.usersService.findById(req.user.userId);
    
    if (!user) {
      return { mensaje: 'Usuario no encontrado' };
    }

    // Crear objeto sin campos sensibles
    const perfil = {
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      username: user.username,
      email: user.email,
      telefono: user.telefono,
      direccion: user.direccion,
      rol: user.rol,
      fecha_creacion: user.fecha_creacion,
      fecha_actualizacion: user.fecha_actualizacion,
      ultimo_acceso: user.ultimo_acceso,
    };

    return perfil;
  }

  /**
   * Actualizar perfil del usuario
   */
  @UseGuards(JwtAuthGuard)
  @Patch('perfil')
  @HttpCode(HttpStatus.OK)
  async updateProfile(@Request() req, @Body() updateProfileDto: UpdateProfileDto) {
    const user = await this.usersService.updateProfile(req.user.userId, updateProfileDto);
    
    // Crear objeto sin campos sensibles
    const perfil = {
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      username: user.username,
      email: user.email,
      telefono: user.telefono,
      direccion: user.direccion,
      rol: user.rol,
      fecha_creacion: user.fecha_creacion,
      fecha_actualizacion: user.fecha_actualizacion,
      ultimo_acceso: user.ultimo_acceso,
    };

    return {
      mensaje: 'Perfil actualizado exitosamente',
      usuario: perfil,
    };
  }

  /**
   * Cambiar contraseña
   */
  @UseGuards(JwtAuthGuard)
  @Patch('cambiar-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
    await this.usersService.changePassword(req.user.userId, changePasswordDto.nuevaPassword);
    
    return {
      mensaje: 'Contraseña actualizada exitosamente',
    };
  }

  /**
   * Obtener todos los usuarios (solo rol ADMIN)
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();

    // Devolver usuarios sin campos sensibles
    return users.map((user) => ({
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      username: user.username,
      email: user.email,
      telefono: user.telefono,
      direccion: user.direccion,
      rol: user.rol,
      fecha_creacion: user.fecha_creacion,
      fecha_actualizacion: user.fecha_actualizacion,
      ultimo_acceso: user.ultimo_acceso,
    }));
  }
}
