import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';


export enum UsersRole {
	USER = 'user',
	MUSICIAN = 'musician'
}

export interface UsersModel extends Base {
}

export class UsersModel extends TimeStamps {
	@prop({unique: true})
	email: string;

	@prop()
	name: string;

	@prop({enum: UsersRole, default: UsersRole.USER})
	role: UsersRole;

	@prop()
	passwordHash: string;

	@prop()
	photo: string;

	@prop()
	about: string;
}