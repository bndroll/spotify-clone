import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUpdateUserPhotoRequest, IUpdateUserRequest, IUserResponse } from './types';
import { userAPI } from '../../services/api/userAPI';


export const findUserData = createAsyncThunk<IUserResponse>(
	'user/findMe',
	async (): Promise<IUserResponse> => {
		return await userAPI.findUserData();
	}
);

export const updateUserById = createAsyncThunk<IUserResponse, IUpdateUserRequest>(
	'user/updateUserById',
	async (data: IUpdateUserRequest): Promise<IUserResponse> => {
		return await userAPI.updateUserById(data);
	}
);

export const updateUserPhotoById = createAsyncThunk<IUserResponse, IUpdateUserPhotoRequest>(
	'user/updateUserPhotoById',
	async (data: IUpdateUserPhotoRequest): Promise<IUserResponse> => {
		return await userAPI.updateUserPhotoById(data);
	}
);