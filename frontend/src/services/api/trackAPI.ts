import axios from 'axios';
import { ICreateTrackRequest, IDeleteClosableTrackRequest, ITrack } from '../../store/track/types';


export const trackAPI = {
	async createTrack(requestData: ICreateTrackRequest): Promise<ITrack> {
		const formData = new FormData();

		formData.append('files', requestData.imageFile);
		formData.append('files', requestData.audioFile);
		formData.append('title', requestData.title);

		const res = await axios.post(`${process.env.REACT_APP_SPOTIFY_SERVER_URL}/tracks`, formData, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('spotify_token')}`
			}
		});

		return res.data;
	},

	async findAllTracks(): Promise<ITrack[]> {
		const res = await axios.get(`${process.env.REACT_APP_SPOTIFY_SERVER_URL}/tracks`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('spotify_token')}`
			}
		});

		return res.data;
	},

	async findAllClosable(): Promise<ITrack[]> {
		const res = await axios.get(`${process.env.REACT_APP_SPOTIFY_SERVER_URL}/tracks/find/closable`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('spotify_token')}`
			}
		});

		return res.data;
	},

	async findTrackById(id: string): Promise<ITrack> {
		const res = await axios.get(`${process.env.REACT_APP_SPOTIFY_SERVER_URL}/tracks/${id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('spotify_token')}`
			}
		});

		return res.data;
	},

	async findFavoritesTracks(): Promise<ITrack[]> {
		const res = await axios.get(`${process.env.REACT_APP_SPOTIFY_SERVER_URL}/tracks/favorites/find`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('spotify_token')}`
			}
		});

		return res.data;
	},

	async likeTrack(id: string): Promise<ITrack> {
		const res = await axios.patch(`${process.env.REACT_APP_SPOTIFY_SERVER_URL}/tracks/favorites/${id}`, {}, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('spotify_token')}`
			}
		});

		return res.data;
	},

	async listenTrack(id: string): Promise<ITrack> {
		const res = await axios.patch(`${process.env.REACT_APP_SPOTIFY_SERVER_URL}/tracks/${id}/listen`, {}, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('spotify_token')}`
			}
		});

		return res.data;
	},

	async deleteTrackById(id: string): Promise<ITrack> {
		const res = await axios.delete(`${process.env.REACT_APP_SPOTIFY_SERVER_URL}/tracks/${id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('spotify_token')}`
			}
		});

		return res.data;
	},

	async deleteClosableTrackById(data: IDeleteClosableTrackRequest): Promise<ITrack> {
		const res = await axios.patch(`${process.env.REACT_APP_SPOTIFY_SERVER_URL}/albums/${data.albumId}/remove`, {
			trackId: data.trackId
		}, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('spotify_token')}`
			}
		});

		return res.data;
	}
};