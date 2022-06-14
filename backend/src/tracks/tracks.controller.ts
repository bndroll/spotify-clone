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
import { FilesInterceptor } from '@nestjs/platform-express';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { Role } from '../roles/roles.decorator';
import { UsersRole } from '../users/users.model';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../roles/roles.guard';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { TracksConstants } from './tracks.constants';
import { UserIsTrackAuthorGuard } from '../users/guards/user-is-track-author.guard';
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
	async create(
		@UploadedFiles() files: Array<Express.Multer.File>,
		@Body() dto: CreateTrackDto,
		@User('id') userId: string) {

		const oldTrack = await this.tracksService.findByTitleAndAuthor(dto.title, userId);

		if (oldTrack)
			throw new BadRequestException(TracksConstants.TRACK_ALREADY_EXIST);

		return await this.tracksService.create(files, dto, userId);
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll() {
		return await this.tracksService.findAll();
	}

	@Get('/find/closable')
	@UseGuards(JwtAuthGuard)
	async findAllClosable() {
		return await this.tracksService.findAllClosable();
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	async findById(@Param('id', IdValidationPipe) id: string) {
		const track = await this.tracksService.findById(id);

		if (!track)
			throw new NotFoundException(TracksConstants.TRACK_NOT_FOUND);

		if (!track.isAccessible)
			throw new NotFoundException(TracksConstants.TRACK_NOT_ACCESSIBLE);

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

		if (track.isAccessible === false)
			throw new BadRequestException(TracksConstants.TRACK_NOT_ACCESSIBLE);

		return await this.tracksService.likeSong(userId, id);
	}

	@Patch(':id/listen')
	@UseGuards(JwtAuthGuard)
	async listenTrack(@Param('id', IdValidationPipe) id: string) {
		const track = await this.tracksService.findById(id);

		if (!track)
			throw new NotFoundException(TracksConstants.TRACK_NOT_FOUND);

		if (track.isAccessible === false)
			throw new BadRequestException(TracksConstants.TRACK_NOT_ACCESSIBLE);

		return await this.tracksService.listenTrack(id);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	@UseGuards(UserIsTrackAuthorGuard)
	async deleteById(@Param('id', IdValidationPipe) id: string) {
		const track = await this.tracksService.findById(id);

		if (!track)
			throw new NotFoundException(TracksConstants.TRACK_NOT_FOUND);

		if (track.albumId)
			throw new BadRequestException(TracksConstants.TRACK_IN_ALBUM);

		return await this.tracksService.deleteById(id);
	}
}
