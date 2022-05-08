import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { TracksModel } from '../tracks/tracks.model';


export interface PlaylistsModel extends Base {
}

export class PlaylistsModel extends TimeStamps {
	@prop({required: true})
	title: string;

	@prop({default: new Date()})
	date: Date;

	@prop({required: true})
	picture: string;

	@prop({ref: () => TracksModel, type: () => TracksModel, default: new Map()})
	songs?: Map<Ref<TracksModel>, TracksModel>;

	@prop({default: false})
	isAccessible: boolean;

	@prop({required: true})
	authorId: Types.ObjectId;
}