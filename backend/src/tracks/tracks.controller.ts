import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Patch,
	Post,
	Query,
	UploadedFiles,
	UseGuards,
	UseInterceptors
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { Role } from '../roles/roles.decorator';
import { UsersRole } from '../users/users.model';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../roles/roles.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { TracksConstants } from './tracks.constants';
import { UserIsAuthorGuard } from '../users/guards/user-is-author.guard';
import { User } from '../users/decorators/users.decorator';


@Controller('tracks')
export class TracksController {
	constructor(
		private readonly tracksService: TracksService
	) {
	}

	@Post()
	@Role(UsersRole.MUSICIAN)
	@UseGuards(JwtAuthGuard)
	@UseGuards(RolesGuard)
	@UseInterceptors(FilesInterceptor('files'))
	async create(@UploadedFiles() files: Array<Express.Multer.File>, @Body() dto: CreateTrackDto) {
		const oldTrack = await this.tracksService.findTrackByTitleAndAuthorName(dto.title, dto.authorId);

		if (oldTrack)
			throw new BadRequestException(TracksConstants.TRACK_ALREADY_EXIST);

		return await this.tracksService.create(files, dto);
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(@Query('limit') limit?: string) {
		return await this.tracksService.findAll(Number(limit));
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	async findById(@Param('id', IdValidationPipe) id: string) {
		const track = await this.tracksService.findById(id);

		if (!track)
			throw new NotFoundException(TracksConstants.TRACK_NOT_FOUND);

		return track;
	}

	@Get('favorites/find')
	@UseGuards(JwtAuthGuard)
	async findFavorites(@User('id') userId: string) {
		return await this.tracksService.findFavorites(userId);
	}

	@Patch('favorites/:id')
	@UseGuards(JwtAuthGuard)
	async likeTrack(
		@User('id') userId: string,
		@Param('id', IdValidationPipe) id: string) {

		const track = await this.tracksService.findById(id);

		if (!track)
			throw new BadRequestException(TracksConstants.TRACK_NOT_FOUND);

		return await this.tracksService.likeSong(userId, id);
	}

	@Patch(':id/listen')
	@UseGuards(JwtAuthGuard)
	async listenTrack(@Param('id', IdValidationPipe) id: string) {
		const track = await this.tracksService.findById(id);

		if (!track)
			throw new NotFoundException(TracksConstants.TRACK_NOT_FOUND);

		return await this.tracksService.listenTrack(id);
	}

	@Delete(':id')
	@Role(UsersRole.MUSICIAN)
	@UseGuards(JwtAuthGuard)
	@UseGuards(RolesGuard)
	@UseGuards(UserIsAuthorGuard)
	async deleteById(@Param('id', IdValidationPipe) id: string) {
		const track = await this.tracksService.findById(id);

		if (!track)
			throw new NotFoundException(TracksConstants.TRACK_NOT_FOUND);

		return await this.tracksService.deleteById(id);
	}
}
