import { IsNotEmpty, IsOptional, IsString } from 'class-validator';


export class CreateTrackDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsOptional()
	date?: string;
}