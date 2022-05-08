import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';


export class RemoveTrackFromAlbumDto {
	@IsNotEmpty()
	trackId: Types.ObjectId;
}