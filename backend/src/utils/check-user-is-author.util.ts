import { BadRequestException } from '@nestjs/common';
import { TracksConstants } from '../tracks/tracks.constants';


export const checkUserIsAuthor = async (user: any, track: any) => {
	try {
		const userId = await user
			.then(res => res[0])
			.then(res => res._id)
			.then(res => res.toString());

		const trackAuthorId = await track
			.then(res => res.authorId)
			.then(res => res.toString());

		return userId === trackAuthorId;
	} catch (e) {
		throw new BadRequestException(TracksConstants.NO_CREATE_PERMISSIONS);
	}
};