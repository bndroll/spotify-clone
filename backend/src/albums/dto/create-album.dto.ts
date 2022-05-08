import { IsNotEmpty, IsOptional, IsString } from 'class-validator';


export class CreateAlbumDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsOptional()
	date?: string;
}
