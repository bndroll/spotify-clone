import axios from 'axios';
import { ISearchResponse } from '../../store/search/types';


export const searchAPI = {
	async search(text: string): Promise<ISearchResponse> {
		const res = await axios.get(`${process.env.REACT_APP_SPOTIFY_SERVER_URL}/search/${text}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('spotify_token')}`
			}
		});

		return res.data;
	}
};