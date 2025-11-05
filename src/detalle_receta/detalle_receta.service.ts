import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Detalle_receta, Prisma } from '@prisma/client';

@Injectable()
export class DetalleRecetaService {
	constructor(private prisma: PrismaService) {}

	async create(
		data: Prisma.Detalle_recetaCreateInput,
	): Promise<Detalle_receta> {
		return this.prisma.detalle_receta.create({ data });
	}

	async findAll(): Promise<Detalle_receta[]> {
		return this.prisma.detalle_receta.findMany({ where: { disponible: true } });
	}

	async findOne(id: string): Promise<Detalle_receta> {
		const detalle = await this.prisma.detalle_receta.findFirst({
			where: { id, disponible: true },
		});
		if (!detalle)
			throw new NotFoundException(`Detalle_receta with ID ${id} not found`);
		return detalle;
	}

	async update(
		id: string,
		data: Prisma.Detalle_recetaUpdateInput,
	): Promise<Detalle_receta> {
		await this.findOne(id);
		return this.prisma.detalle_receta.update({ where: { id }, data });
	}

	async remove(id: string): Promise<Detalle_receta> {
		await this.findOne(id);
		return this.prisma.detalle_receta.update({
			where: { id },
			data: { disponible: false },
		});
	}
}
