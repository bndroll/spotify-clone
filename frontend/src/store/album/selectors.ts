import { RootState } from '../store';


export const selectAlbums = (state: RootState) => state.album.albums;
export const selectClosableAlbums = (state: RootState) => state.album.closableAlbums;
export const selectAlbumsStatus = (state: RootState) => state.album.status;
export const selectAlbumsErrorMessage = (state: RootState) => state.album.errorMessage;

export const selectAlbum = (id: string) => (state: RootState) => {
	const album = state.album.albums.find(item => item._id === id);
	const songs = album?.songs;
	const resSongs = [];
	let listens = 0;

	for (const song in songs) {
		const currentSong = state.track.tracks.find(item => item._id === song);
		listens += currentSong?.listens || 0;

		resSongs.push(currentSong);
	}

	return {
		...album,
		songs: resSongs,
		listens: listens
	};
};

export const selectClosableAlbum = (id: string) => (state: RootState) => {
	const album = state.album.closableAlbums.find(item => item._id === id);
	const songs = album?.songs;
	const resSongs = [];
	let listens = 0;

	for (const song in songs) {
		const currentSong = state.track.closableTracks.find(item => item._id === song);
		listens += currentSong?.listens || 0;

		resSongs.push(currentSong);
	}

	return {
		...album,
		songs: resSongs,
		listens: listens
	};
};