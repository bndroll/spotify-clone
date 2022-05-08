import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { AlbumsModel } from '../albums/albums.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { TracksModel } from '../tracks/tracks.model';
import { UsersModel } from '../users/users.model';


@Injectable()
export class SearchService {
	constructor(
		@InjectModel(AlbumsModel) private readonly albumsModel: ModelType<AlbumsModel>,
		@InjectModel(TracksModel) private readonly tracksModel: ModelType<TracksModel>,
		@InjectModel(UsersModel) private readonly usersModel: ModelType<UsersModel>
	) {
	}

	async search(text: string) {
		const result = [];

		result.push(
			await this.tracksModel
				.find({title: {'$regex': text, '$options': 'i'}, isAccessible: true})
				.sort({_id: -1})
				.limit(4)
				.exec()
		);

		result.push(
			await this.albumsModel
				.find({title: {'$regex': text, '$options': 'i'}, isAccessible: true})
				.sort({_id: -1})
				.limit(4)
				.exec()
		);

		result.push(
			await this.usersModel
				.find({name: {'$regex': text, '$options': 'i'}, role: 'musician'})
				.sort({_id: -1})
				.limit(4)
				.exec()
		);

		return result;
	}
}
