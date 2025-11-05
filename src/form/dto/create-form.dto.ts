import {
	IsNotEmpty,
	IsBoolean,
	IsString,
	IsEnum,
	IsUUID,
} from 'class-validator';
import { EnumTipoConsulta } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormDto {
	@ApiProperty({ type: 'boolean', example: true })
	@IsBoolean()
	@IsNotEmpty()
	disponible: boolean;

	@ApiProperty({ enum: EnumTipoConsulta })
	@IsEnum(EnumTipoConsulta)
	@IsNotEmpty()
	tipoConsulta: EnumTipoConsulta;

	@ApiProperty({ type: 'string', example: 'Tos, fiebre' })
	@IsString()
	@IsNotEmpty()
	sintomas: string;

	@ApiProperty({ type: 'string', example: 'Observaciones del medico' })
	@IsString()
	@IsNotEmpty()
	observaciones: string;

	@ApiProperty({ type: 'string', example: 'Diagnóstico preliminar' })
	@IsString()
	@IsNotEmpty()
	diagnostico: string;

	@ApiProperty({
		type: 'string',
		format: 'uuid',
		example: '00000000-0000-0000-0000-000000000000',
	})
	@IsUUID()
	@IsNotEmpty()
	userId: string;
}
