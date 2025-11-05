import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Put,
	Delete,
} from '@nestjs/common';
import { FormService } from './form.service';
import { Form } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';

@ApiTags('forms')
@Controller('forms')
export class FormController {
	constructor(private readonly formService: FormService) {}

	@Post()
	@ApiOperation({ summary: 'Create form' })
	@ApiResponse({ status: 201, description: 'Form created' })
	@ApiBody({ type: CreateFormDto })
	async create(@Body() data: CreateFormDto): Promise<Form> {
		return this.formService.create(data as any);
	}

	@Get()
	@ApiOperation({ summary: 'Get all forms' })
	@ApiResponse({ status: 200, description: 'List of forms' })
	async findAll(): Promise<Form[]> {
		return this.formService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get form by id' })
	@ApiResponse({ status: 200, description: 'Form found' })
	async findOne(@Param('id') id: string): Promise<Form> {
		return this.formService.findOne(id);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update form' })
	@ApiResponse({ status: 200, description: 'Form updated' })
	@ApiBody({ type: UpdateFormDto })
	async update(
		@Param('id') id: string,
		@Body() data: UpdateFormDto,
	): Promise<Form> {
		return this.formService.update(id, data as any);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete (soft) form' })
	@ApiResponse({ status: 200, description: 'Form soft-deleted' })
	async remove(@Param('id') id: string): Promise<Form> {
		return this.formService.remove(id);
	}
}
