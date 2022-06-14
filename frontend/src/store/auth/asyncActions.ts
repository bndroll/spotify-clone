import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILoginUser, ILoginUserResponse, IRegisterUser, IRegisterUserResponse } from './types';
import { authAPI } from '../../services/api/authAPI';


export const singUp = createAsyncThunk<IRegisterUserResponse, IRegisterUser>(
	'auth/singUp',
	async (data: IRegisterUser) => {
		return await authAPI.register(data);
	}
);

export const singIn = createAsyncThunk<ILoginUserResponse, ILoginUser>(
	'auth/singIn',
	async (data: ILoginUser) => {
		return await authAPI.login(data);
	}
);

export const singOut = createAsyncThunk(
	'auth/singOut',
	async () => {
		return await authAPI.logout();
	}
);