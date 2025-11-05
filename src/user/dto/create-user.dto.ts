import { IsString, IsEmail, IsDateString, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nombre: string;

  @IsString()
  apellidos: string;

  @IsEmail()
  email: string;

  @IsString()
  dni: string;

  @IsString()
  sexo: string;

  @IsString()
  estadoCivil: string;

  @IsString()
  obraSocial: string;

  @IsDateString()
  fechaNacimiento: Date;

  @IsBoolean()
  @IsOptional()
  disponible?: boolean;
}
