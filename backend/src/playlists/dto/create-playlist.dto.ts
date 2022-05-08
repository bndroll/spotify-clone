import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';


export class CreatePlaylistDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsArray()
	@IsNotEmpty()
	songs: Array<Types.ObjectId>;

	@IsNotEmpty()
	authorId: Types.ObjectId;
}
