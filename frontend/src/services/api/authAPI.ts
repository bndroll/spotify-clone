import { ILoginUser, ILoginUserResponse, IRegisterUser, IRegisterUserResponse } from '../../store/auth/types';
import axios from 'axios';


export const authAPI = {
	async register(data: IRegisterUser): Promise<IRegisterUserResponse> {
		const res = await axios.post(`${process.env.REACT_APP_SPOTIFY_SERVER_URL}/auth/register`, {
			email: data.email,
			password: data.password,
			name: data.name,
			role: data.role
		});

		return res.data;
	},

	async login(data: ILoginUser): Promise<ILoginUserResponse> {
		const res = await axios.post(`${process.env.REACT_APP_SPOTIFY_SERVER_URL}/auth/login`, {
			email: data.email,
			password: data.password
		});

		localStorage.setItem('spotify_token', res.data.access_token);

		return res.data;
	},

	async logout(): Promise<void> {
		localStorage.removeItem('spotify_token');
	}
};