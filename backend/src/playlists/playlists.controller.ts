import {
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	NotFoundException,
	Param,
	Post,
	Query,
	UseGuards
} from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { PlaylistsConstants } from './playlists.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { User } from '../users/decorators/users.decorator';


@Controller('playlists')
export class PlaylistsController {
	constructor(
		private readonly playlistsService: PlaylistsService
	) {
	}

	@Post()
	create(@Body() createPlaylistDto: CreatePlaylistDto) {
		return this.playlistsService.create(createPlaylistDto);
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(@Query('limit') limit?: string) {
		return await this.playlistsService.findAll(Number(limit));
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	async finById(@Param('id', IdValidationPipe) id: string) {
		const playlist = await this.playlistsService.findById(id);

		if (!playlist)
			throw new NotFoundException(PlaylistsConstants.PLAYLIST_NOT_FOUND);

		return playlist;
	}

	@Delete(':id')
	async deleteById(
		@User('id') userId: string,
		@Param('id', IdValidationPipe) id: string) {

		const playlist = await this.playlistsService.findById(id);

		if (playlist.authorId.toString() !== userId)
			throw new ForbiddenException(PlaylistsConstants.NOT_ACCESS);

		return await this.playlistsService.deleteById(id);
	}
}
