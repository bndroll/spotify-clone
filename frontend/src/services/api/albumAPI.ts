import axios from 'axios';
import { IAlbum, ICreateAlbumRequest, ICreateTrackAndAddToAlbum } from '../../store/album/types';
import { ITrack } from '../../store/track/types';


export const albumAPI = {
	async createAlbum(data: ICreateAlbumRequest): Promise<IAlbum> {
		const formData = new FormData();

		formData.append('file', data.imageFile);
		formData.append('title', data.title);

		const res = await axios.post(`${process.env.REACT_APP_SPOTIFY_SERVER_URL}/albums`, formData, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('spotify_token')}`
			}
		});

		return res.data;
	},

	async findAllAlbums(): Promise<IAlbum[]> {
		const res = await axios.get(`${process.env.REACT_APP_SPOTIFY_SERVER_URL}/albums`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('spotify_token')}`
			}
		});

		return res.data;
	},

	async findAllClosableAlbums(): Promise<IAlbum[]> {
		const res = await axios.get(`${process.env.REACT_APP_SPOTIFY_SERVER_URL}/albums/find/closable`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('spotify_token')}`
			}
		});

		return res.data;
	},

	async findAlbumById(id: string): Promise<IAlbum> {
		const res = await axios.get(`${process.env.REACT_APP_SPOTIFY_SERVER_URL}/albums/${id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('spotify_token')}`
			}
		});

		return res.data;
	},

	async createTrackAndAddToAlbum(data: ICreateTrackAndAddToAlbum): Promise<ITrack> {
		const formData = new FormData();

		formData.append('file', data.audioFile);
		formData.append('title', data.title);

		const res = await axios.patch(`${process.env.REACT_APP_SPOTIFY_SERVER_URL}/albums/${data.id}/add`, formData, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('spotify_token')}`
			}
		});

		return res.data;
	},

	async openAlbumById(id: string): Promise<IAlbum> {
		const res = await axios.patch(`${process.env.REACT_APP_SPOTIFY_SERVER_URL}/albums/${id}`, {}, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('spotify_token')}`
			}
		});

		return res.data;
	},

	async deleteAlbumById(id: string): Promise<IAlbum> {
		const res = await axios.delete(`${process.env.REACT_APP_SPOTIFY_SERVER_URL}/albums/${id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('spotify_token')}`
			}
		});

		return res.data;
	}
};