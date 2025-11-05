import { IsNotEmpty, IsBoolean, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMeetingDto {
	@ApiProperty({ type: 'boolean', example: true })
	@IsBoolean()
	@IsNotEmpty()
	disponible: boolean;

	@ApiProperty({ type: 'string', example: 'Mensaje de la reunión' })
	@IsString()
	@IsNotEmpty()
	text: string;

	@ApiProperty({
		type: 'string',
		format: 'uuid',
		example: '00000000-0000-0000-0000-000000000000',
	})
	@IsUUID()
	@IsNotEmpty()
	formId: string;
}
