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
	UploadedFile,
	UseGuards,
	UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { AlbumsConstants } from './albums.constants';
import { Role } from '../roles/roles.decorator';
import { UsersRole } from '../users/users.model';
import { RolesGuard } from '../roles/roles.guard';
import { AddTrackToAlbumDto } from './dto/add-track-to-album.dto';
import { TracksService } from '../tracks/tracks.service';
import { TracksConstants } from '../tracks/tracks.constants';
import { User } from '../users/decorators/users.decorator';
import { UserIsAlbumAuthorGuard } from '../users/guards/user-is-album-author.guard';
import { RemoveTrackFromAlbumDto } from './dto/remove-track-form-album.dto';


@Controller('albums')
export class AlbumsController {
	constructor(
		private readonly albumsService: AlbumsService,
		private readonly tracksService: TracksService
	) {
	}

	@Post()
	@Role(UsersRole.MUSICIAN)
	@UseGuards(JwtAuthGuard)
	@UseGuards(RolesGuard)
	@UseInterceptors(FileInterceptor('file'))
	async create(
		@UploadedFile() file: Express.Multer.File,
		@Body() dto: CreateAlbumDto,
		@User('id') userId: string) {

		const oldAlbum = await this.albumsService.findByTitleAndAuthor(dto.title, userId);

		if (oldAlbum)
			throw new BadRequestException(AlbumsConstants.ALBUM_ALREADY_EXIST);

		return await this.albumsService.create(file, dto, userId);
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(@Query('limit') limit?: string) {
		return await this.albumsService.findAll(Number(limit));
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	async findById(@Param('id', IdValidationPipe) id: string) {
		const album = await this.albumsService.findById(id);

		if (!album)
			throw new NotFoundException(AlbumsConstants.ALBUM_NOT_FOUND);

		if (!album.isAccessible)
			throw new NotFoundException(AlbumsConstants.ALBUM_NOT_ACCESSIBLE);

		return album;
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	@UseGuards(UserIsAlbumAuthorGuard)
	async openAlbum(@Param('id', IdValidationPipe) id: string) {
		const album = await this.albumsService.findById(id);

		if (!album)
			throw new NotFoundException(AlbumsConstants.ALBUM_NOT_FOUND);

		if (album.isAccessible)
			return album;

		return await this.albumsService.openAlbum(id);
	}

	@Patch(':id/add')
	@UseGuards(JwtAuthGuard)
	@UseGuards(UserIsAlbumAuthorGuard)
	@UseInterceptors(FileInterceptor('file'))
	async addTrackToAlbum(
		@UploadedFile() file: Express.Multer.File,
		@Body() dto: AddTrackToAlbumDto,
		@Param('id', IdValidationPipe) id: string,
		@User('id') userId: string) {

		const oldTrack = await this.tracksService.findByTitleAndAuthor(dto.title, userId);

		if (oldTrack)
			throw new BadRequestException(TracksConstants.TRACK_ALREADY_EXIST);

		return await this.albumsService.addTrackToAlbum(id, file, dto, userId);
	}

	@Patch(':id/remove')
	@UseGuards(JwtAuthGuard)
	@UseGuards(UserIsAlbumAuthorGuard)
	async removeTrackFromAlbum(
		@Body() dto: RemoveTrackFromAlbumDto,
		@Param('id', IdValidationPipe) id: string) {

		const track = await this.tracksService.findById(String(dto.trackId));

		if (!track)
			throw new BadRequestException(TracksConstants.TRACK_NOT_FOUND);

		if (id !== String(track.albumId))
			throw new BadRequestException(TracksConstants.TRACK_NOT_IN_ALBUM);

		return await this.albumsService.removeTrackFromAlbum(id, String(dto.trackId));
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	@UseGuards(UserIsAlbumAuthorGuard)
	async deleteById(@Param('id', IdValidationPipe) id: string) {
		const album = await this.albumsService.findById(id);

		if (!album)
			throw new NotFoundException(AlbumsConstants.ALBUM_NOT_FOUND);

		return await this.albumsService.deleteById(id);
	}
}
