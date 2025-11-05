import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Receta, Prisma } from '@prisma/client';

@Injectable()
export class RecetaService {
	constructor(private prisma: PrismaService) {}

	async create(data: Prisma.RecetaCreateInput): Promise<Receta> {
		return this.prisma.receta.create({ data });
	}

	async findAll(): Promise<Receta[]> {
		return this.prisma.receta.findMany({ where: { disponible: true } });
	}

	async findOne(id: string): Promise<Receta> {
		const receta = await this.prisma.receta.findFirst({
			where: { id, disponible: true },
		});
		if (!receta) throw new NotFoundException(`Receta with ID ${id} not found`);
		return receta;
	}

	async update(id: string, data: Prisma.RecetaUpdateInput): Promise<Receta> {
		await this.findOne(id);
		return this.prisma.receta.update({ where: { id }, data });
	}

	async remove(id: string): Promise<Receta> {
		await this.findOne(id);
		return this.prisma.receta.update({
			where: { id },
			data: { disponible: false },
		});
	}
}
