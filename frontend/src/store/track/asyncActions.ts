import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICreateTrackRequest, IDeleteClosableTrackRequest, ITrack } from './types';
import { trackAPI } from '../../services/api/trackAPI';


export const createTrack = createAsyncThunk<ITrack, ICreateTrackRequest>(
	'track/createTrack',
	async (data: ICreateTrackRequest): Promise<ITrack> => {
		return await trackAPI.createTrack(data);
	}
);

export const findAllTracks = createAsyncThunk<ITrack[]>(
	'track/findAllTracks',
	async (): Promise<ITrack[]> => {
		return await trackAPI.findAllTracks();
	}
);

export const findAllClosableTracks = createAsyncThunk<ITrack[]>(
	'track/findAllClosable',
	async (): Promise<ITrack[]> => {
		return await trackAPI.findAllClosable();
	}
);

export const findTrackById = createAsyncThunk<ITrack, string>(
	'track/findTrackById',
	async (id: string): Promise<ITrack> => {
		return await trackAPI.findTrackById(id);
	}
);

export const findFavoritesTracks = createAsyncThunk<ITrack[]>(
	'track/findFavoritesTracks',
	async (): Promise<ITrack[]> => {
		return await trackAPI.findFavoritesTracks();
	}
);

export const likeTrack = createAsyncThunk<ITrack, string>(
	'track/likeTrack',
	async (id: string): Promise<ITrack> => {
		return await trackAPI.likeTrack(id);
	}
);

export const listenTrack = createAsyncThunk<ITrack, string>(
	'track/listenTrack',
	async (id: string): Promise<ITrack> => {
		return await trackAPI.listenTrack(id);
	}
);

export const deleteTrackById = createAsyncThunk<ITrack, string>(
	'track/deleteTrackById',
	async (id: string): Promise<ITrack> => {
		return await trackAPI.deleteTrackById(id);
	}
);

export const deleteClosableTrackById = createAsyncThunk<ITrack, IDeleteClosableTrackRequest>(
	'track/deleteClosableTrackById',
	async (data: IDeleteClosableTrackRequest): Promise<ITrack> => {
		return await trackAPI.deleteClosableTrackById(data);
	}
);

