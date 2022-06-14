import { Status } from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISetFavoritesTracksByFilters, ITrackSliceState, TrackStateErrorMessages } from './types';
import {
	createTrack,
	deleteClosableTrackById,
	deleteTrackById,
	findAllClosableTracks,
	findAllTracks,
	findFavoritesTracks,
	likeTrack,
	listenTrack
} from './asyncActions';
import { convertTrackMediaPaths } from './utils/convert-track-media-paths';
import { findFavoritesByFilters } from './utils/find-favorites-by-filters';
import { createTrackAndAddToAlbum } from '../album/asyncActions';


const initialState: ITrackSliceState = {
	tracks: [],
	filteredTracks: [],
	favoritesTracks: [],
	filteredFavoritesTracks: [],
	closableTracks: [],
	currentTrack: null,
	status: Status.NEVER,
	errorMessage: null
};

const trackSlice = createSlice({
	name: 'track',
	initialState,
	reducers: {
		setTracksByFilters(state, action: PayloadAction<ISetFavoritesTracksByFilters>) {
			state.filteredFavoritesTracks = findFavoritesByFilters(
				[...Array.from(state.favoritesTracks.values())],
				action.payload
			);
			state.status = Status.SUCCESS;
			state.errorMessage = null;
		},

		setCurrentTrack(state, action: PayloadAction<string>) {
			state.currentTrack = state.tracks.find(item => item._id === action.payload) || null;
		},

		setPrevCurrentTrack(state) {
			const currentTrackId = state.tracks.findIndex(item => item._id === state.currentTrack?._id);
			state.currentTrack = state.tracks[currentTrackId - 1] ? state.tracks[currentTrackId - 1] : state.currentTrack;
		},

		setNextCurrentTrack(state) {
			const currentTrackId = state.tracks.findIndex(item => item._id === state.currentTrack?._id);
			state.currentTrack = state.tracks[currentTrackId + 1] ? state.tracks[currentTrackId + 1] : null;
		},

		resetCurrentTrack(state) {
			state.currentTrack = null;
		},

		resetTrackStatus(state) {
			state.status = Status.NEVER;
			state.errorMessage = null;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(createTrack.fulfilled, (state, action) => {
			state.tracks = [convertTrackMediaPaths(action.payload), ...state.tracks];
			state.status = Status.SUCCESS;
			state.errorMessage = null;
		});

		builder.addCase(createTrack.pending, (state) => {
			state.status = Status.LOADING;
			state.errorMessage = null;
		});

		builder.addCase(createTrack.rejected, (state) => {
			state.status = Status.ERROR;
			state.errorMessage = TrackStateErrorMessages.ALREADY_EXIST;
		});

		builder.addCase(findAllTracks.fulfilled, (state, action) => {
			state.tracks = action.payload.map(item => convertTrackMediaPaths(item));
			state.filteredTracks = state.tracks;
			state.status = Status.SUCCESS;
			state.errorMessage = null;
		});

		builder.addCase(findAllTracks.pending, (state) => {
			state.tracks = [];
			state.filteredTracks = [];
			state.status = Status.LOADING;
			state.errorMessage = null;
		});

		builder.addCase(findAllTracks.rejected, (state) => {
			state.tracks = [];
			state.filteredTracks = [];
			state.status = Status.ERROR;
			state.errorMessage = TrackStateErrorMessages.FIND_SERVER_ERROR;
		});

		builder.addCase(findAllClosableTracks.fulfilled, (state, action) => {
			state.closableTracks = action.payload.map(item => convertTrackMediaPaths(item));
			state.status = Status.SUCCESS;
			state.errorMessage = null;
		});

		builder.addCase(findAllClosableTracks.pending, (state) => {
			state.closableTracks = [];
			state.status = Status.LOADING;
			state.errorMessage = null;
		});

		builder.addCase(findAllClosableTracks.rejected, (state) => {
			state.closableTracks = [];
			state.status = Status.ERROR;
			state.errorMessage = TrackStateErrorMessages.FIND_SERVER_ERROR;
		});

		builder.addCase(findFavoritesTracks.fulfilled, (state, action) => {
			state.favoritesTracks = action.payload.map(item => convertTrackMediaPaths(item));
			state.filteredFavoritesTracks = state.favoritesTracks;
			state.status = Status.SUCCESS;
			state.errorMessage = null;
		});

		builder.addCase(findFavoritesTracks.pending, (state) => {
			state.favoritesTracks = [];
			state.filteredFavoritesTracks = [];
			state.status = Status.LOADING;
			state.errorMessage = null;
		});

		builder.addCase(findFavoritesTracks.rejected, (state) => {
			state.favoritesTracks = [];
			state.filteredFavoritesTracks = [];
			state.status = Status.ERROR;
			state.errorMessage = TrackStateErrorMessages.FIND_SERVER_ERROR;
		});

		builder.addCase(likeTrack.fulfilled, (state, action) => {
			state.tracks = state.tracks.map(item => {
				if (item._id === action.payload._id)
					return convertTrackMediaPaths(action.payload);

				return item;
			});
			state.filteredTracks = state.tracks;

			const track = state.favoritesTracks.find(item => item._id === action.payload._id);
			if (!track) {
				state.favoritesTracks = [convertTrackMediaPaths(action.payload), ...state.favoritesTracks];
			} else {
				state.favoritesTracks = state.favoritesTracks.filter(item => item._id !== action.payload._id);
			}

			state.filteredFavoritesTracks = state.favoritesTracks;
			state.status = Status.SUCCESS;
			state.errorMessage = null;
		});

		builder.addCase(likeTrack.rejected, (state) => {
			state.status = Status.ERROR;
			state.errorMessage = TrackStateErrorMessages.NOT_FOUND;
		});

		builder.addCase(listenTrack.fulfilled, (state) => {
			state.status = Status.SUCCESS;
			state.errorMessage = null;
		});

		builder.addCase(listenTrack.pending, (state) => {
			state.status = Status.LOADING;
			state.errorMessage = null;
		});

		builder.addCase(listenTrack.rejected, (state) => {
			state.status = Status.ERROR;
			state.errorMessage = TrackStateErrorMessages.NOT_FOUND;
		});

		builder.addCase(createTrackAndAddToAlbum.fulfilled, (state, action) => {
			state.closableTracks = [convertTrackMediaPaths(action.payload), ...state.closableTracks];
			state.status = Status.SUCCESS;
			state.errorMessage = null;
		});

		builder.addCase(deleteTrackById.fulfilled, (state, action) => {
			state.tracks = state.tracks.filter(item => item._id !== action.payload._id);
			state.filteredTracks = state.tracks;
			state.favoritesTracks = state.favoritesTracks.filter(item => item._id !== action.payload._id);
			state.filteredFavoritesTracks = Array.from(state.favoritesTracks.values());
			state.status = Status.SUCCESS;
			state.errorMessage = null;
		});

		builder.addCase(deleteTrackById.pending, (state) => {
			state.status = Status.LOADING;
			state.errorMessage = null;
		});

		builder.addCase(deleteTrackById.rejected, (state) => {
			state.status = Status.ERROR;
			state.errorMessage = TrackStateErrorMessages.NOT_FOUND;
		});

		builder.addCase(deleteClosableTrackById.fulfilled, (state, action) => {
			state.closableTracks = state.closableTracks.filter(item => item._id !== action.payload._id);
			state.status = Status.SUCCESS;
			state.errorMessage = null;
		});

		builder.addCase(deleteClosableTrackById.pending, (state) => {
			state.status = Status.LOADING;
			state.errorMessage = null;
		});

		builder.addCase(deleteClosableTrackById.rejected, (state) => {
			state.status = Status.ERROR;
			state.errorMessage = TrackStateErrorMessages.NOT_FOUND;
		});
	}
});

export const {
	setTracksByFilters,
	resetTrackStatus,
	setCurrentTrack,
	setPrevCurrentTrack,
	setNextCurrentTrack,
	resetCurrentTrack
} = trackSlice.actions;
export default trackSlice.reducer;