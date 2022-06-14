import { IAuthorSliceState } from './types';
import { Status } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { findMusicians } from './asyncActions';


const initialState: IAuthorSliceState = {
	authors: [],
	status: Status.NEVER,
	errorMessage: null
};

const authorSlice = createSlice({
	name: 'author',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(findMusicians.fulfilled, (state, action) => {
			state.authors = action.payload.map(item => {
				return {
					_id: item._id,
					name: item.name,
					email: item.email,
					role: item.role,
					about: item.about,
					photo: `${process.env.REACT_APP_FILE_SYSTEM_SERVER_URL}${item.photo}`
				};
			});

			state.status = Status.SUCCESS;
			state.errorMessage = null;
		});
	}
});

export default authorSlice.reducer;