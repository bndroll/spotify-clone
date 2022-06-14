import { Status } from '../types';


export interface ITrackSliceState {
	tracks: ITrack[];
	filteredTracks: ITrack[];
	favoritesTracks: ITrack[];
	filteredFavoritesTracks: ITrack[];
	closableTracks: ITrack[];
	currentTrack: ITrack | null;
	status: Status;
	errorMessage: TrackStateErrorMessages | null;
}

export interface ITrack {
	_id: string;
	title: string;
	date: Date;
	listens: number;
	picture: string;
	audio: string;
	isAccessible: boolean;
	albumId: string | null;
	authorId: string | null;
}

export interface ICreateTrackRequest {
	imageFile: File;
	audioFile: File;
	title: string;
	date?: string;
}

export interface IDeleteClosableTrackRequest {
	albumId: string;
	trackId: string;
}

export interface ISetFavoritesTracksByFilters {
	searchText: string | null;
}

export enum TrackStateErrorMessages {
	FIND_SERVER_ERROR = 'Ошибка при загрузке треков',
	CREATING_ERROR = 'Ошибка при создании трека',
	ALREADY_EXIST = 'Такой трек уже существует',
	NOT_FOUND = 'Трека не существует',
}