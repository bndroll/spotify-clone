import { Status } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { AlbumStateErrorMessages, IAlbumSliceState } from './types';
import {
	createAlbum,
	createTrackAndAddToAlbum,
	deleteAlbumById,
	findAllAlbums,
	findAllClosableAlbums,
	openAlbumById
} from './asyncActions';
import { convertAlbumMediaPaths } from './utils/convert-album-media-paths';
import { deleteClosableTrackById } from '../track/asyncActions';


const initialState: IAlbumSliceState = {
	albums: [],
	closableAlbums: [],
	status: Status.NEVER,
	errorMessage: null
};

const albumSlice = createSlice({
	name: 'album',
	initialState,
	reducers: {
		resetAlbumStatus(state) {
			state.status = Status.NEVER;
			state.errorMessage = null;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(createAlbum.fulfilled, (state, action) => {
			state.closableAlbums = [convertAlbumMediaPaths(action.payload), ...state.closableAlbums];
			state.status = Status.SUCCESS;
			state.errorMessage = null;
		});

		builder.addCase(createAlbum.pending, (state) => {
			state.status = Status.LOADING;
			state.errorMessage = null;
		});

		builder.addCase(createAlbum.rejected, (state) => {
			state.status = Status.ERROR;
			state.errorMessage = AlbumStateErrorMessages.NOT_FOUND;
		});

		builder.addCase(findAllAlbums.fulfilled, (state, action) => {
			state.albums = action.payload.map(item => convertAlbumMediaPaths(item));
			state.status = Status.SUCCESS;
			state.errorMessage = null;
		});

		builder.addCase(findAllAlbums.pending, (state) => {
			state.albums = [];
			state.status = Status.LOADING;
			state.errorMessage = null;
		});

		builder.addCase(findAllAlbums.rejected, (state) => {
			state.albums = [];
			state.status = Status.ERROR;
			state.errorMessage = AlbumStateErrorMessages.FIND_SERVER_ERROR;
		});

		builder.addCase(findAllClosableAlbums.fulfilled, (state, action) => {
			state.closableAlbums = action.payload.map(item => convertAlbumMediaPaths(item));
			state.status = Status.SUCCESS;
			state.errorMessage = null;
		});

		builder.addCase(findAllClosableAlbums.pending, (state) => {
			state.closableAlbums = [];
			state.status = Status.LOADING;
			state.errorMessage = null;
		});

		builder.addCase(findAllClosableAlbums.rejected, (state) => {
			state.closableAlbums = [];
			state.status = Status.ERROR;
			state.errorMessage = AlbumStateErrorMessages.FIND_SERVER_ERROR;
		});

		builder.addCase(createTrackAndAddToAlbum.fulfilled, (state, action) => {
			state.closableAlbums = state.closableAlbums.map(item => {
				if (item._id === action.payload.albumId) {
					let songsId = [];
					for (const song in item.songs) {
						songsId.push(song);
					}

					songsId.push(action.payload._id);
					const newSongs: { [key: string]: string } = {};

					for (const id of songsId) {
						newSongs[`${id}`] = id;
					}

					return {
						_id: item._id,
						title: item.title,
						date: item.date,
						songs: {...newSongs},
						authorId: item.authorId,
						isAccessible: item.isAccessible,
						picture: item.picture
					};
				}

				return item;
			});
			state.status = Status.SUCCESS;
			state.errorMessage = null;
		});

		builder.addCase(openAlbumById.fulfilled, (state, action) => {
			state.albums = [action.payload, ...state.albums];
			state.closableAlbums = state.closableAlbums.filter(item => item._id !== action.payload._id);
			state.status = Status.SUCCESS;
			state.errorMessage = null;
		});

		builder.addCase(openAlbumById.pending, (state) => {
			state.status = Status.LOADING;
			state.errorMessage = null;
		});

		builder.addCase(openAlbumById.rejected, (state) => {
			state.status = Status.ERROR;
			state.errorMessage = AlbumStateErrorMessages.NOT_FOUND;
		});

		builder.addCase(deleteAlbumById.fulfilled, (state, action) => {
			state.albums = state.albums.filter(item => item._id !== action.payload._id);
			state.status = Status.SUCCESS;
			state.errorMessage = null;
		});

		builder.addCase(deleteAlbumById.pending, (state) => {
			state.status = Status.LOADING;
			state.errorMessage = null;
		});

		builder.addCase(deleteAlbumById.rejected, (state) => {
			state.status = Status.ERROR;
			state.errorMessage = AlbumStateErrorMessages.NOT_FOUND;
		});

		builder.addCase(deleteClosableTrackById.fulfilled, (state, action) => {
			state.closableAlbums = state.closableAlbums.map(item => {
				if (item._id === action.payload.albumId) {
					let songsId = [];
					for (const song in item.songs) {
						songsId.push(song);
					}

					songsId = songsId.filter(item => item !== action.payload._id);
					const newSongs: { [key: string]: string } = {};

					for (const id of songsId) {
						newSongs[`${id}`] = id;
					}

					return {
						_id: item._id,
						title: item.title,
						date: item.date,
						songs: {...newSongs},
						authorId: item.authorId,
						isAccessible: item.isAccessible,
						picture: item.picture
					};
				}

				return item;
			});
			state.status = Status.SUCCESS;
			state.errorMessage = null;
		});
	}
});

export const {resetAlbumStatus} = albumSlice.actions;
export default albumSlice.reducer;