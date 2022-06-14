import { ISearchSliceState, SearchStateErrorMessages } from './types';
import { Status } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { search } from './asyncActions';
import { convertTrackMediaPaths } from '../track/utils/convert-track-media-paths';
import { convertAlbumMediaPaths } from '../album/utils/convert-album-media-paths';


const initialState: ISearchSliceState = {
	data: null,
	status: Status.NEVER,
	errorMessage: null
};

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(search.fulfilled, (state, action) => {
			state.data = {
				tracks: action.payload.tracks.map(item => convertTrackMediaPaths(item)),
				albums: action.payload.albums.map(item => convertAlbumMediaPaths(item)),
				users: action.payload.users.map(item => ({
					...item,
					photo: `${process.env.REACT_APP_FILE_SYSTEM_SERVER_URL}${item.photo}`
				}))
			};

			state.status = Status.SUCCESS;
			state.errorMessage = null;
		});

		builder.addCase(search.pending, (state) => {
			state.data = null;
			state.status = Status.LOADING;
			state.errorMessage = null;
		});

		builder.addCase(search.rejected, (state) => {
			state.data = null;
			state.status = Status.ERROR;
			state.errorMessage = SearchStateErrorMessages.SEARCH_BAD_REQUEST;
		});
	}
});

export default searchSlice.reducer;