import { IUserResponse } from '../../store/user/types';
import axios from 'axios';


export const authorAPI = {
	async findMusicians(): Promise<IUserResponse[]> {
		const res = await axios.get(`${process.env.REACT_APP_SPOTIFY_SERVER_URL}/users/musicians`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('spotify_token')}`
			}
		});

		return res.data;
	}
};