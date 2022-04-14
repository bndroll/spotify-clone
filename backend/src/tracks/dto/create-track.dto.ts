import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';


export class CreateTrackDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsOptional()
	date?: string;

	@IsNotEmpty()
	authorId: Types.ObjectId;
}