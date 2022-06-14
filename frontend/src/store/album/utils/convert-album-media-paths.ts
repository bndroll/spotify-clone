import { IAlbum } from '../types';


export const convertAlbumMediaPaths = (album: IAlbum): IAlbum => {
	return ({
		...album,
		picture: `${process.env.REACT_APP_FILE_SYSTEM_SERVER_URL}${album.picture}`
	});
};