import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Form, Prisma } from '@prisma/client';

@Injectable()
export class FormService {
	constructor(private prisma: PrismaService) {}

	async create(data: Prisma.FormCreateInput): Promise<Form> {
		return this.prisma.form.create({ data });
	}

	async findAll(): Promise<Form[]> {
		return this.prisma.form.findMany({ where: { disponible: true } });
	}

	async findOne(id: string): Promise<Form> {
		const form = await this.prisma.form.findFirst({
			where: { id, disponible: true },
		});
		if (!form) throw new NotFoundException(`Form with ID ${id} not found`);
		return form;
	}

	async update(id: string, data: Prisma.FormUpdateInput): Promise<Form> {
		await this.findOne(id);
		return this.prisma.form.update({ where: { id }, data });
	}

	async remove(id: string): Promise<Form> {
		await this.findOne(id);
		return this.prisma.form.update({
			where: { id },
			data: { disponible: false },
		});
	}
}
