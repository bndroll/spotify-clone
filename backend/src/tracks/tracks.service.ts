import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from 'nestjs-typegoose';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { CreateTrackDto } from './dto/create-track.dto';
import { TracksModel } from './tracks.model';
import { UsersService } from 'src/users/users.service';
import { TracksMediaType } from './tracks.constants';
import { UsersModel } from '../users/users.model';
import { tracksFilePostRequest } from '../api/file-system/tracks/tracks-post.request';


@Injectable()
export class TracksService {
	constructor(
		@InjectModel(TracksModel)
		private readonly tracksModel: ModelType<TracksModel>,
		private readonly usersService: UsersService,
		private readonly configService: ConfigService
	) {
	}

	async create(files: Array<Express.Multer.File>, dto: CreateTrackDto, userId: string): Promise<DocumentType<TracksModel>> {
		const user: UsersModel = await this.usersService.findById(userId);

		await tracksFilePostRequest({
				file: files[0],
				type: TracksMediaType.IMAGE,
				trackTitle: dto.title,
				userName: user.name
			},
			this.configService
		);

		await tracksFilePostRequest({
				file: files[1],
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

		const newTrack = new this.tracksModel({
			title: dto.title,
			date: dto.date ? date : new Date(),
			listens: 0,
			picture: `/tracks/${TracksMediaType.IMAGE}/${user.name}/${dto.title}`,
			audio: `/tracks/${TracksMediaType.AUDIO}/${user.name}/${dto.title}`,
			authorId: userId
		});

		return newTrack.save();
	}

	async findAll(): Promise<DocumentType<TracksModel>[]> {
		return this.tracksModel
			.find({isAccessible: true})
			.sort({_id: -1})
			.exec();
	}

	async findAllClosable(): Promise<DocumentType<TracksModel>[]> {
		return this.tracksModel
			.find({isAccessible: false})
			.sort({_id: -1})
			.exec();
	}

	async findByTitleAndAuthor(title: string, authorId: string): Promise<DocumentType<TracksModel>> {
		return await this.tracksModel.findOne({title, authorId}).exec();
	}

	async findById(id: string): Promise<DocumentType<TracksModel>> {
		return this.tracksModel.findById(id).exec();
	}

	async findFavorites(userId: string): Promise<DocumentType<TracksModel>[]> {
		const user = await this.usersService.findById(userId);
		const likedSongs = [];

		for (const likedSong of user.likedSongs.values()) {
			const song = await this.findById(String(likedSong));

			if (!song) {
				await this.likeSong(userId, String(likedSong));
				continue;
			}

			likedSongs.push(await this.findById(String(likedSong)));
		}

		return likedSongs;
	}

	async openTrack(id: string): Promise<void> {
		const track = await this.findById(id);
		track.isAccessible = true;
		await track.save();
	}

	async likeSong(userId: string, trackId: string) {
		const user = await this.usersService.findById(userId);
		const track = await this.findById(trackId);

		const checkedTrackId = new Types.ObjectId(trackId);

		if (!track) {
			user.likedSongs.delete(checkedTrackId);
			await user.save();
			return user.likedSongs;
		}

		if (user.likedSongs.has(track.id))
			user.likedSongs.delete(track.id);
		else
			user.likedSongs.set(track.id, track);

		await user.save();

		return track;
	}

	async listenTrack(id: string): Promise<DocumentType<TracksModel>> {
		const track = await this.tracksModel.findById(id);
		track.listens += 1;
		return await track.save();
	}

	async deleteById(id: string): Promise<DocumentType<TracksModel>> {
		return await this.tracksModel.findByIdAndDelete(id).exec();
	}
}
