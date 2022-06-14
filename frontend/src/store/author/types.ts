import { Status } from '../types';


export interface IAuthorSliceState {
	authors: IAuthorResponse[];
	status: Status;
	errorMessage: AuthorStateErrorMessages | null;
}

export interface IAuthorResponse {
	_id: string;
	email: string;
	name: string;
	role: string;
	photo: string;
	about: string;
}

export enum AuthorStateErrorMessages {
}