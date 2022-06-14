import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAlbum, ICreateAlbumRequest, ICreateTrackAndAddToAlbum } from './types';
import { albumAPI } from '../../services/api/albumAPI';
import { ITrack } from '../track/types';


export const createAlbum = createAsyncThunk<IAlbum, ICreateAlbumRequest>(
	'album/createAlbum',
	async (data: ICreateAlbumRequest): Promise<IAlbum> => {
		return await albumAPI.createAlbum(data);
	}
);

export const findAllAlbums = createAsyncThunk<IAlbum[]>(
	'album/findAllAlbums',
	async (): Promise<IAlbum[]> => {
		return await albumAPI.findAllAlbums();
	}
);

export const findAllClosableAlbums = createAsyncThunk<IAlbum[]>(
	'album/findAllClosableAlbums',
	async (): Promise<IAlbum[]> => {
		return await albumAPI.findAllClosableAlbums();
	}
);

export const findAlbumById = createAsyncThunk<IAlbum, string>(
	'album/findAlbumById',
	async (id: string): Promise<IAlbum> => {
		return await albumAPI.findAlbumById(id);
	}
);

export const createTrackAndAddToAlbum = createAsyncThunk<ITrack, ICreateTrackAndAddToAlbum>(
	'album/createTrackAndAddToAlbum',
	async (data: ICreateTrackAndAddToAlbum): Promise<ITrack> => {
		return await albumAPI.createTrackAndAddToAlbum(data);
	}
);

export const openAlbumById = createAsyncThunk<IAlbum, string>(
	'album/openAlbumById',
	async (id: string): Promise<IAlbum> => {
		return await albumAPI.openAlbumById(id);
	}
);

export const deleteAlbumById = createAsyncThunk<IAlbum, string>(
	'album/deleteAlbumById',
	async (id: string): Promise<IAlbum> => {
		return await albumAPI.deleteAlbumById(id);
	}
);