import { IsDate, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';


export class CreateTrackDto {
	@IsNotEmpty()
	title: string;

	@IsDate()
	date: Date;

	@IsNotEmpty()
	authorId: Types.ObjectId;
}