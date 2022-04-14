import { ConfigService } from '@nestjs/config';
import * as FormData from 'form-data';
import axios from 'axios';


export interface PhotoFilePostRequestDto {
	file: Express.Multer.File;
	userName: string;
}

export const photoFilePostRequest = async (dto: PhotoFilePostRequestDto, configService: ConfigService) => {
	const formData = new FormData();

	formData.append('file', Buffer.from(dto.file.buffer), dto.file.originalname);
	formData.append('userName', dto.userName);

	return await axios.post(
		`http://${configService.get('FILE_SYSTEM_HOST')}:${configService.get('FILE_SYSTEM_PORT')}/profile`,
		formData,
		{headers: formData.getHeaders()})
		.then(res => res.data);
};
