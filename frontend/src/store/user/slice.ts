import { IUserSliceState, UserStateErrorMessages } from './types';
import { Status } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { singIn, singOut, singUp } from '../auth/asyncActions';
import { findUserData, updateUserById, updateUserPhotoById } from './asyncActions';


const initialState: IUserSliceState = {
	data: null,
	isAuthorized: false,
	status: Status.NEVER,
	errorMessage: null
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		resetUserStatus(state) {
			state.status = Status.NEVER;
			state.errorMessage = null;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(singUp.fulfilled, (state, action) => {
			state.data = {
				_id: action.payload._id,
				name: action.payload.name,
				email: action.payload.email,
				role: action.payload.role,
				about: action.payload.about,
				photo: `${process.env.REACT_APP_FILE_SYSTEM_SERVER_URL}${action.payload.photo}`
			};
			state.isAuthorized = false;
			state.status = Status.SUCCESS;
			state.errorMessage = null;
		});

		builder.addCase(singUp.rejected, (state) => {
			state.data = null;
			state.isAuthorized = false;
			state.status = Status.ERROR;
			state.errorMessage = UserStateErrorMessages.ALREADY_REGISTERED;
		});

		builder.addCase(singUp.pending, (state) => {
			state.data = null;
			state.isAuthorized = false;
			state.status = Status.LOADING;
			state.errorMessage = null;
		});

		builder.addCase(singIn.fulfilled, (state) => {
			state.isAuthorized = true;
			state.status = Status.SUCCESS;
			state.errorMessage = null;
		});

		builder.addCase(singIn.rejected, (state) => {
			state.isAuthorized = false;
			state.status = Status.ERROR;
			state.errorMessage = UserStateErrorMessages.LOGIN_BAD_REQUEST;
		});

		builder.addCase(singIn.pending, (state) => {
			state.isAuthorized = false;
			state.status = Status.LOADING;
			state.errorMessage = null;
		});

		builder.addCase(singOut.fulfilled, (state) => {
			state.data = null;
			state.isAuthorized = false;
			state.status = Status.NEVER;
			state.errorMessage = null;
		});

		builder.addCase(findUserData.fulfilled, (state, action) => {
			state.data = {
				_id: action.payload._id,
				name: action.payload.name,
				email: action.payload.email,
				role: action.payload.role,
				about: action.payload.about,
				photo: `${process.env.REACT_APP_FILE_SYSTEM_SERVER_URL}${action.payload.photo}`,
				likedSongs: action.payload.likedSongs
			};

			state.isAuthorized = true;
			state.status = Status.SUCCESS;
			state.errorMessage = null;
		});

		builder.addCase(findUserData.rejected, (state) => {
			state.data = null;
			state.isAuthorized = false;
			state.status = Status.ERROR;
		});

		builder.addCase(updateUserById.fulfilled, (state, action) => {
			state.data = {
				_id: action.payload._id,
				name: action.payload.name,
				email: action.payload.email,
				role: action.payload.role,
				about: action.payload.about,
				photo: `${process.env.REACT_APP_FILE_SYSTEM_SERVER_URL}${action.payload.photo}`,
				likedSongs: action.payload.likedSongs
			};
			state.status = Status.SUCCESS;
		});

		builder.addCase(updateUserPhotoById.fulfilled, (state, action) => {
			state.data = {
				_id: action.payload._id,
				name: action.payload.name,
				email: action.payload.email,
				role: action.payload.role,
				about: action.payload.about,
				photo: `${process.env.REACT_APP_FILE_SYSTEM_SERVER_URL}${action.payload.photo}`,
				likedSongs: action.payload.likedSongs
			};
			state.status = Status.SUCCESS;
		});

		builder.addCase(updateUserPhotoById.pending, (state) => {
			state.data = null;
			state.status = Status.LOADING;
		});
	}
});

export const {resetUserStatus} = userSlice.actions;
export default userSlice.reducer;