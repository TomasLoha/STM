import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Put,
	Delete,
} from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { Meeting } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';

@ApiTags('meetings')
@Controller('meetings')
export class MeetingController {
	constructor(private readonly meetingService: MeetingService) {}

	@Post()
	@ApiOperation({ summary: 'Create meeting' })
	@ApiResponse({ status: 201, description: 'Meeting created' })
	@ApiBody({ type: CreateMeetingDto })
	async create(@Body() data: CreateMeetingDto): Promise<Meeting> {
		return this.meetingService.create(data as any);
	}

	@Get()
	@ApiOperation({ summary: 'Get all meetings' })
	@ApiResponse({ status: 200, description: 'List of meetings' })
	async findAll(): Promise<Meeting[]> {
		return this.meetingService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get meeting by id' })
	@ApiResponse({ status: 200, description: 'Meeting found' })
	async findOne(@Param('id') id: string): Promise<Meeting> {
		return this.meetingService.findOne(id);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update meeting' })
	@ApiResponse({ status: 200, description: 'Meeting updated' })
	@ApiBody({ type: UpdateMeetingDto })
	async update(
		@Param('id') id: string,
		@Body() data: UpdateMeetingDto,
	): Promise<Meeting> {
		return this.meetingService.update(id, data as any);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete (soft) meeting' })
	@ApiResponse({ status: 200, description: 'Meeting soft-deleted' })
	async remove(@Param('id') id: string): Promise<Meeting> {
		return this.meetingService.remove(id);
	}
}
