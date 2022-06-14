import { Status } from '../types';


export interface IAlbumSliceState {
	albums: IAlbum[];
	closableAlbums: IAlbum[];
	status: Status;
	errorMessage: AlbumStateErrorMessages | null;
}

export interface IAlbum {
	_id: string;
	title: string;
	date: Date;
	picture: string;
	songs: { [key: string]: string };
	isAccessible: boolean;
	authorId: string;
}

export interface ICreateAlbumRequest {
	imageFile: File;
	title: string;
	date?: string;
}

export interface ICreateTrackAndAddToAlbum {
	id: string;
	audioFile: File;
	title: string;
	date?: string;
}

export enum AlbumStateErrorMessages {
	FIND_SERVER_ERROR = 'Ошибка при загрузке альбомов',
	ALREADY_EXIST = 'Такой альбом уже существует',
	NOT_FOUND = 'Альбом не существует',
}
