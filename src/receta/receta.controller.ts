import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Put,
	Delete,
} from '@nestjs/common';
import { RecetaService } from './receta.service';
import { Receta } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';

@ApiTags('recetas')
@Controller('recetas')
export class RecetaController {
	constructor(private readonly recetaService: RecetaService) {}

	@Post()
	@ApiOperation({ summary: 'Create receta' })
	@ApiResponse({ status: 201, description: 'Receta created' })
	@ApiBody({ type: CreateRecetaDto })
	async create(@Body() data: CreateRecetaDto): Promise<Receta> {
		return this.recetaService.create(data as any);
	}

	@Get()
	@ApiOperation({ summary: 'Get all recetas' })
	@ApiResponse({ status: 200, description: 'List of recetas' })
	async findAll(): Promise<Receta[]> {
		return this.recetaService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get receta by id' })
	@ApiResponse({ status: 200, description: 'Receta found' })
	async findOne(@Param('id') id: string): Promise<Receta> {
		return this.recetaService.findOne(id);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update receta' })
	@ApiResponse({ status: 200, description: 'Receta updated' })
	@ApiBody({ type: UpdateRecetaDto })
	async update(
		@Param('id') id: string,
		@Body() data: UpdateRecetaDto,
	): Promise<Receta> {
		return this.recetaService.update(id, data as any);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete (soft) receta' })
	@ApiResponse({ status: 200, description: 'Receta soft-deleted' })
	async remove(@Param('id') id: string): Promise<Receta> {
		return this.recetaService.remove(id);
	}
}
