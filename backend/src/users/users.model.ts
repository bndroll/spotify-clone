import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop, Ref } from '@typegoose/typegoose';
import { TracksModel } from '../tracks/tracks.model';


export enum UsersRole {
	USER = 'user',
	MUSICIAN = 'musician'
}

export interface UsersModel extends Base {
}

export class UsersModel extends TimeStamps {
	@prop({unique: true})
	email: string;

	@prop({required: true})
	name: string;

	@prop({enum: UsersRole, default: UsersRole.USER})
	role: UsersRole;

	@prop()
	passwordHash: string;

	@prop()
	photo?: string;

	@prop()
	about?: string;

	@prop({ref: () => TracksModel, type: () => TracksModel, default: new Map()})
	likedSongs?: Map<Ref<TracksModel>, TracksModel>;
}