import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { index, prop, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { TracksModel } from '../tracks/tracks.model';


export interface AlbumsModel extends Base {
}

@index({title: 'text'})
export class AlbumsModel extends TimeStamps {
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