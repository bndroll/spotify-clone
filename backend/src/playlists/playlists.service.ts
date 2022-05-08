import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ConfigService } from '@nestjs/config';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { UsersService } from '../users/users.service';
import { PlaylistsModel } from './playlists.model';


@Injectable()
export class PlaylistsService {
	constructor(
		@InjectModel(PlaylistsModel)
		private readonly playlistsModel: ModelType<PlaylistsModel>,
		private readonly usersService: UsersService,
		private readonly configService: ConfigService
	) {
	}

	create(createPlaylistDto: CreatePlaylistDto) {
		return 'This action adds a new playlist';
	}

	async findAll(limit: number = 10): Promise<DocumentType<PlaylistsModel>[]> {
		return this.playlistsModel.find().sort({_id: -1}).limit(limit).exec();
	}

	async findById(id: string): Promise<DocumentType<PlaylistsModel>> {
		return this.playlistsModel.findById(id).exec();
	}

	updatePictureById(id: number, updatePlaylistDto: UpdatePlaylistDto) {
		return `This action updates a #${id} playlist`;
	}

	async deleteById(id: string) {
		return await this.playlistsModel.findByIdAndDelete(id).exec();
	}
}
