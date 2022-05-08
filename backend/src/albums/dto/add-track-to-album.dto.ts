import { IsNotEmpty, IsOptional, IsString } from 'class-validator';


export class AddTrackToAlbumDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsOptional()
	date?: string;
}