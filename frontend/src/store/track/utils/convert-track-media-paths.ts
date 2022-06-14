import { ITrack } from '../types';


export const convertTrackMediaPaths = (track: ITrack): ITrack => {
	return ({
		...track,
		picture: `${process.env.REACT_APP_FILE_SYSTEM_SERVER_URL}${track.picture}`,
		audio: `${process.env.REACT_APP_FILE_SYSTEM_SERVER_URL}${track.audio}`
	});
};