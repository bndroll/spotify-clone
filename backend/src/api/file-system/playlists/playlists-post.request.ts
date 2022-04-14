import { ConfigService } from '@nestjs/config';
import * as FormData from 'form-data';
import axios from 'axios';


export interface PlaylistsFilePostRequestDto {
	file: Express.Multer.File;
	authorName: string;
	title: string
}

export const PlaylistsFilePostRequestDto = async (dto: PlaylistsFilePostRequestDto, configService: ConfigService) => {
	const formData = new FormData();

	formData.append('file', Buffer.from(dto.file.buffer), dto.file.originalname);
	formData.append('authorName', dto.authorName);
	formData.append('title', dto.title);

	return await axios.post(
		`http://${configService.get('FILE_SYSTEM_HOST')}:${configService.get('FILE_SYSTEM_PORT')}/playlists`,
		formData,
		{headers: formData.getHeaders()})
		.then(res => res.data);
};
