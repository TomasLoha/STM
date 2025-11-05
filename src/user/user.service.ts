import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async create(data: Prisma.UserCreateInput): Promise<User> {
		return this.prisma.user.create({ data });
	}

	async findAll(): Promise<User[]> {
		return this.prisma.user.findMany({
			where: { deletedAt: null },
		});
	}

	async findOne(id: string): Promise<User> {
		const user = await this.prisma.user.findFirst({
			where: { id, deletedAt: null },
		});

		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`);
		}

		return user;
	}

	async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
		await this.findOne(id); // Check if user exists
		return this.prisma.user.update({
			where: { id },
			data,
		});
	}

	async remove(id: string): Promise<User> {
		await this.findOne(id); // Check if user exists
		return this.prisma.user.update({
			where: { id },
			data: { deletedAt: new Date() },
		});
	}
}
