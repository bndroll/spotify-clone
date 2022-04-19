import { BadRequestException, Injectable } from '@nestjs/common';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';
import { CreateTrackDto } from './dto/create-track.dto';
import { TracksModel } from './tracks.model';
import { UsersService } from 'src/users/users.service';
import { TracksConstants, TracksMediaType } from './tracks.constants';
import { UsersModel } from '../users/users.model';
import { ConfigService } from '@nestjs/config';
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

	async create(files: Array<Express.Multer.File>, dto: CreateTrackDto): Promise<DocumentType<TracksModel>> {
		const oldTrack = await this.findTrackByTitleAndAuthorName(dto.title, dto.authorId);

		if (oldTrack)
			throw new BadRequestException(TracksConstants.TRACK_ALREADY_EXIST);

		const user: UsersModel = await this.usersService.findById(String(dto.authorId));

		await tracksFilePostRequest(
			{
				file: files[0],
				type: TracksMediaType.IMAGE,
				trackTitle: dto.title,
				userName: user.name
			},
			this.configService
		);

		await tracksFilePostRequest(
			{
				file: files[1],
				type: TracksMediaType.AUDIO,
				trackTitle: dto.title,
				userName: user.name
			},
			this.configService
		);

		const [day, month, year] = dto.date.split('-');

		const newTrack = new this.tracksModel({
			title: dto.title,
			date: dto.date ? new Date(Number(year), Number(month), Number(day)) : new Date(),
			listens: 0,
			picture: `/tracks/${TracksMediaType.IMAGE}/${user.name}/${dto.title}`,
			audio: `/tracks/${TracksMediaType.AUDIO}/${user.name}/${dto.title}`,
			authorId: dto.authorId
		});

		return newTrack.save();
	}

	async findAll(limit: number = 10): Promise<DocumentType<TracksModel>[]> {
		return this.tracksModel.find().sort({_id: -1}).limit(limit).exec();
	}

	async findTrackByTitleAndAuthorName(title: string, authorId: Types.ObjectId): Promise<DocumentType<TracksModel>> {
		return await this.tracksModel.findOne({title, authorId}).exec();
	}

	async findById(id: string): Promise<DocumentType<TracksModel>> {
		return await this.tracksModel.findById(id).exec();
	}

	async findFavorites(userId: string) {
		const user = await this.usersService.findById(userId);

		return user.likedSongs;
	}

	async likeSong(userId: string, trackId: string) {
		const user = await this.usersService.findById(userId);
		const track = await this.findById(trackId);

		if (user.likedSongs.has(track.id))
			user.likedSongs.delete(track.id);
		else
			user.likedSongs.set(track.id, track);

		await user.save();

		return user.likedSongs;
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
