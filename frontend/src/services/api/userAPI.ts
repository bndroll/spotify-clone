import axios from 'axios';
import { IUpdateUserPhotoRequest, IUpdateUserRequest, IUserResponse } from '../../store/user/types';


export const userAPI = {
	async findUserData(): Promise<IUserResponse> {
		const res = await axios.get(`${process.env.REACT_APP_SPOTIFY_SERVER_URL}/users/find/me`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('spotify_token')}`
			}
		});

		return res.data;
	},

	async findMusicianById(id: string): Promise<IUserResponse> {
		const res = await axios.get(`${process.env.REACT_APP_SPOTIFY_SERVER_URL}/users/${id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('spotify_token')}`
			}
		});

		return res.data;
	},

	async updateUserById(data: IUpdateUserRequest): Promise<IUserResponse> {
		const res = await axios.patch(`${process.env.REACT_APP_SPOTIFY_SERVER_URL}/users/${data.id}`, {
			name: data.name,
			about: data.about
		}, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('spotify_token')}`
			}
		});

		return res.data;
	},

	async updateUserPhotoById(data: IUpdateUserPhotoRequest): Promise<IUserResponse> {
		const formData = new FormData();

		formData.append('file', data.file);

		const res = await axios.patch(`${process.env.REACT_APP_SPOTIFY_SERVER_URL}/users/${data.id}/photo`, formData, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('spotify_token')}`
			}
		});

		return res.data;
	}
};