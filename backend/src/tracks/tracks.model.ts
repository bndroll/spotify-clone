import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';


export interface TracksModel extends Base {
}

export class TracksModel extends TimeStamps {
	@prop({required: true})
	title: string;

	@prop({default: new Date()})
	date: Date;

	@prop({default: 0})
	listens: number;

	@prop({required: true})
	picture: string;

	@prop({required: true})
	audio: string;

	@prop()
	authorId: Types.ObjectId;
}