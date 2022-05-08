import { ConfigService } from '@nestjs/config';
import * as FormData from 'form-data';
import axios from 'axios';
import { TracksMediaType } from '../../../tracks/tracks.constants';


export interface TracksFilePostRequestDto {
	file: Express.Multer.File;
	type: TracksMediaType;
	trackTitle: string;
	userName: string;
}

export const tracksFilePostRequest = async (dto: TracksFilePostRequestDto, configService: ConfigService) => {
	const formData = new FormData();

	formData.append('file', Buffer.from(dto.file.buffer), dto.file.originalname);
	formData.append('authorName', dto.userName);
	formData.append('trackTitle', dto.trackTitle);

	return await axios.post(
		`http://${configService.get('FILE_SYSTEM_HOST')}:${configService.get('FILE_SYSTEM_PORT')}/tracks/${dto.type}`,
		formData,
		{headers: formData.getHeaders()})
		.then(res => res.data);
};