import * as FormData from 'form-data';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';


export interface TrackFilePostRequestDto {
	file: Express.Multer.File;
	type: string;
	trackTitle: string;
	userName: string;
}

export interface TrackFileGetRequestDto {
	trackAuthorName: string;
	trackTitle: string;
	type: string;
}

export const trackFilePostRequest = async (dto: TrackFilePostRequestDto, configService: ConfigService) => {
	const formData = new FormData();

	formData.append('file', Buffer.from(dto.file.buffer), dto.file.originalname);
	formData.append('authorName', dto.userName);
	formData.append('trackTitle', dto.trackTitle);

	return await axios.post(
		`http://${configService.get('FILE_SYSTEM_HOST')}:${configService.get('FILE_SYSTEM_PORT')}/files/track/${dto.type}`,
		formData,
		{headers: formData.getHeaders()})
		.then(res => res.data);
};

export const trackFileGetRequest = async (dto: TrackFileGetRequestDto, configService: ConfigService) => {
	return await axios.get(
		`http://${configService.get('FILE_SYSTEM_HOST')}:${configService.get('FILE_SYSTEM_PORT')}/files/track/${dto.type}/${dto.trackAuthorName}/${dto.trackTitle}`
	).then(res => res.data);
};