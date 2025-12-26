// src/images/dto/create-image.dto.ts
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateImageDto {
  @IsInt({ message: 'El producto_id debe ser un número entero' })
  producto_id!: number;

  @IsString({ message: 'La ruta de imagen debe ser una cadena de texto' })
  @MaxLength(500, { message: 'La ruta no puede exceder 500 caracteres' })
  ruta_imagen!: string;

  @IsOptional()
  @IsString({ message: 'El nombre del archivo debe ser una cadena de texto' })
  @MaxLength(255, { message: 'El nombre no puede exceder 255 caracteres' })
  nombre_archivo?: string;

  @IsOptional()
  @IsString({ message: 'El tipo de archivo debe ser una cadena de texto' })
  @MaxLength(50, { message: 'El tipo no puede exceder 50 caracteres' })
  tipo_archivo?: string;

  @IsOptional()
  @IsInt({ message: 'El tamaño debe ser un número entero' })
  tamano_archivo?: number;

  @IsOptional()
  @IsBoolean({ message: 'es_principal debe ser verdadero o falso' })
  es_principal?: boolean;

  @IsOptional()
  @IsInt({ message: 'El orden debe ser un número entero' })
  orden?: number;

  @IsOptional()
  @IsBoolean({ message: 'version_optimizada debe ser verdadero o falso' })
  version_optimizada?: boolean;
}
