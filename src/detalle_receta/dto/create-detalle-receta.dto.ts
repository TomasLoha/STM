import {
	IsNotEmpty,
	IsBoolean,
	IsNumber,
	IsUUID,
	IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDetalleRecetaDto {
	@ApiProperty({
		type: 'string',
		format: 'date-time',
		example: '2025-11-03T00:00:00Z',
	})
	@IsDate()
	@Type(() => Date)
	@IsNotEmpty()
	fecha: Date;

	@ApiProperty({ type: 'boolean', example: true })
	@IsBoolean()
	@IsNotEmpty()
	disponible: boolean;

	@ApiProperty({ type: 'number', example: 2 })
	@IsNumber()
	@IsNotEmpty()
	cantidad: number;

	@ApiProperty({
		type: 'string',
		format: 'uuid',
		example: '00000000-0000-0000-0000-000000000000',
	})
	@IsUUID()
	@IsNotEmpty()
	recetaId: string;

	@ApiProperty({ type: 'string', format: 'uuid', required: false })
	@IsUUID()
	formId?: string;
}
