import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleRecetaDto } from './create-detalle-receta.dto';

export class UpdateDetalleRecetaDto extends PartialType(
	CreateDetalleRecetaDto,
) {}
