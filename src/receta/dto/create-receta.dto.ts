import { IsNotEmpty, IsBoolean, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecetaDto {
	@ApiProperty({ type: 'boolean', example: true })
	@IsBoolean()
	@IsNotEmpty()
	disponible: boolean;

	@ApiProperty({ type: 'string', example: 'Receta de prueba' })
	@IsString()
	@IsNotEmpty()
	nombre: string;

	@ApiProperty({ type: 'string', example: 'Descripción breve' })
	@IsString()
	@IsNotEmpty()
	descripcion: string;

	@ApiProperty({ type: 'number', example: 9.99 })
	@IsNumber()
	@IsNotEmpty()
	precio: number;
}
