import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';


export interface TracksModel extends Base {
}

export class TracksModel extends TimeStamps {
	@prop()
	title: string;

	@prop()
	date: Date;

	@prop()
	listens: number;

	@prop()
	pictures: string;

	@prop()
	audio: string;

	@prop()
	authorId: Types.ObjectId;
}