import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Put,
	Delete,
} from '@nestjs/common';
import { DetalleRecetaService } from './detalle_receta.service';
import { Detalle_receta } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateDetalleRecetaDto } from './dto/create-detalle-receta.dto';
import { UpdateDetalleRecetaDto } from './dto/update-detalle-receta.dto';

@ApiTags('detalle-recetas')
@Controller('detalle-recetas')
export class DetalleRecetaController {
	constructor(private readonly detalleService: DetalleRecetaService) {}

	@Post()
	@ApiOperation({ summary: 'Create detalle receta' })
	@ApiResponse({ status: 201, description: 'Detalle creado' })
	@ApiBody({ type: CreateDetalleRecetaDto })
	async create(@Body() data: CreateDetalleRecetaDto): Promise<Detalle_receta> {
		return this.detalleService.create(data as any);
	}

	@Get()
	@ApiOperation({ summary: 'Get all detalle recetas' })
	@ApiResponse({ status: 200, description: 'List of detalle recetas' })
	async findAll(): Promise<Detalle_receta[]> {
		return this.detalleService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get detalle receta by id' })
	@ApiResponse({ status: 200, description: 'Detalle found' })
	async findOne(@Param('id') id: string): Promise<Detalle_receta> {
		return this.detalleService.findOne(id);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update detalle receta' })
	@ApiResponse({ status: 200, description: 'Detalle updated' })
	@ApiBody({ type: UpdateDetalleRecetaDto })
	async update(
		@Param('id') id: string,
		@Body() data: UpdateDetalleRecetaDto,
	): Promise<Detalle_receta> {
		return this.detalleService.update(id, data as any);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete (soft) detalle receta' })
	@ApiResponse({ status: 200, description: 'Detalle soft-deleted' })
	async remove(@Param('id') id: string): Promise<Detalle_receta> {
		return this.detalleService.remove(id);
	}
}
