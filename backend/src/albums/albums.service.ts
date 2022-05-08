import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumsModel } from './albums.model';
import { UsersService } from '../users/users.service';
import { UsersModel } from '../users/users.model';
import { albumsFilePostRequestDto } from '../api/file-system/albums/albums-post.request';
import { AddTrackToAlbumDto } from './dto/add-track-to-album.dto';
import { tracksFilePostRequest } from '../api/file-system/tracks/tracks-post.request';
import { TracksMediaType } from '../tracks/tracks.constants';
import { TracksModel } from '../tracks/tracks.model';
import { TracksService } from '../tracks/tracks.service';


@Injectable()
export class AlbumsService {
	constructor(
		@InjectModel(AlbumsModel) private readonly albumsModel: ModelType<AlbumsModel>,
		@InjectModel(TracksModel) private readonly tracksModel: ModelType<TracksModel>,
		private readonly usersService: UsersService,
		private readonly configService: ConfigService,
		private readonly tracksService: TracksService
	) {
	}

	async create(file: Express.Multer.File, dto: CreateAlbumDto, userId: string): Promise<DocumentType<AlbumsModel>> {
		const user: UsersModel = await this.usersService.findById(userId);

		await albumsFilePostRequestDto({
				file: file,
				title: dto.title,
				authorName: user.name
			}, this.configService
		);

		let date: Date;

		if (dto.date) {
			const [day, month, year] = dto.date.split('-');
			date = new Date(Number(year), Number(month), Number(day));
		}

		const newAlbum = new this.albumsModel({
			title: dto.title,
			date: dto.date ? date : new Date(),
			picture: `/albums/${user.name}/${dto.title}`,
			songs: new Map(),
			isAccessible: false,
			authorId: userId
		});

		return newAlbum.save();
	}

	async findAll(limit: number = 10): Promise<DocumentType<AlbumsModel>[]> {
		return this.albumsModel
			.find({isAccessible: true})
			.sort({_id: -1})
			.limit(limit)
			.exec();
	}

	async findById(id: string): Promise<DocumentType<AlbumsModel>> {
		return await this.albumsModel.findById(id).exec();
	}

	async findByTitleAndAuthor(title: string, authorId: string): Promise<DocumentType<AlbumsModel>> {
		return await this.albumsModel.findOne({title, authorId}).exec();
	}

	async openAlbum(id: string): Promise<DocumentType<AlbumsModel>> {
		const album = await this.findById(id);

		for (const albumTrack of album.songs.values()) {
			await this.tracksService.openTrack(String(albumTrack));
		}

		album.isAccessible = true;
		await album.save();

		return album;
	}

	async addTrackToAlbum(id: string, file: Express.Multer.File, dto: AddTrackToAlbumDto, userId: string): Promise<DocumentType<TracksModel>> {
		const album = await this.findById(id);
		const user = await this.usersService.findById(userId);

		await tracksFilePostRequest({
				file: file,
				type: TracksMediaType.AUDIO,
				trackTitle: dto.title,
				userName: user.name
			},
			this.configService
		);

		let date: Date;

		if (dto.date) {
			const [day, month, year] = dto.date.split('-');
			date = new Date(Number(year), Number(month), Number(day));
		}

		const addedTrack = new this.tracksModel({
			title: dto.title,
			date: date,
			listens: 0,
			picture: album.picture,
			audio: `/tracks/${TracksMediaType.AUDIO}/${user.name}/${dto.title}`,
			isAccessible: false,
			albumId: album._id,
			authorId: user._id
		});

		const track = await addedTrack.save();
		album.songs.set(track._id, track);
		await album.save();

		return track;
	}

	async removeTrackFromAlbum(id: string, trackId: string): Promise<DocumentType<TracksModel>> {
		const album = await this.findById(id);

		album.songs.delete(new Types.ObjectId(trackId));
		await album.save();

		return await this.tracksService.deleteById(trackId);
	}

	async deleteById(id: string): Promise<DocumentType<AlbumsModel>> {
		const album = await this.findById(id);

		for (const albumTrack of album.songs.values()) {
			await this.tracksService.deleteById(String(albumTrack));
		}

		await album.save();

		return this.albumsModel.findByIdAndDelete(id);
	}
}
