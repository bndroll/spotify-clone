import { ITrack } from '../track/types';
import { IAlbum } from '../album/types';
import { IAuthorResponse } from '../author/types';
import { Status } from '../types';


export interface ISearchSliceState {
	data: ISearchResponse | null;
	status: Status;
	errorMessage: SearchStateErrorMessages | null;
}

export interface ISearchResponse {
	tracks: ITrack[],
	albums: IAlbum[],
	users: IAuthorResponse[]
}

export enum SearchStateErrorMessages {
	SEARCH_BAD_REQUEST = 'Ошибка поиска'
}