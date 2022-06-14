import { Status } from '../types';


export interface IUserSliceState {
	data: IUserResponse | null;
	isAuthorized: boolean;
	status: Status;
	errorMessage: UserStateErrorMessages | null;
}

export interface IUserResponse {
	_id: string;
	email: string;
	name: string;
	role: string;
	photo: string;
	about: string;
	likedSongs?: Map<string, string>;
}

export interface IUpdateUserRequest {
	id: string;
	name: string;
	about: string;
}

export interface IUpdateUserPhotoRequest {
	id: string;
	file: File;
}

export enum UserStateErrorMessages {
	ALREADY_REGISTERED = 'Ошибка регистрации, пользователь уже существует',
	LOGIN_BAD_REQUEST = 'Ошибка авторизации, неправильная почта или пароль'
}