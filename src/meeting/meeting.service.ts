import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Meeting, Prisma } from '@prisma/client';

@Injectable()
export class MeetingService {
	constructor(private prisma: PrismaService) {}

	async create(data: Prisma.MeetingCreateInput): Promise<Meeting> {
		return this.prisma.meeting.create({ data });
	}

	async findAll(): Promise<Meeting[]> {
		return this.prisma.meeting.findMany({ where: { disponible: true } });
	}

	async findOne(id: string): Promise<Meeting> {
		const meeting = await this.prisma.meeting.findFirst({
			where: { id, disponible: true },
		});
		if (!meeting)
			throw new NotFoundException(`Meeting with ID ${id} not found`);
		return meeting;
	}

	async update(id: string, data: Prisma.MeetingUpdateInput): Promise<Meeting> {
		await this.findOne(id);
		return this.prisma.meeting.update({ where: { id }, data });
	}

	async remove(id: string): Promise<Meeting> {
		await this.findOne(id);
		return this.prisma.meeting.update({
			where: { id },
			data: { disponible: false },
		});
	}
}
