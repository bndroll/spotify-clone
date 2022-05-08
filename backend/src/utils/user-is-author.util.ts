import { BadRequestException } from '@nestjs/common';
import { UserIsAuthorConstants } from '../types/user-is-author-constants.type';


export const userIsAuthor = async (userId: string, entity: any, messageConstants: UserIsAuthorConstants): Promise<boolean> => {
	const authorId = await entity
		.then(res => {
			if (!res)
				throw new BadRequestException(messageConstants.NOT_FOUND);

			return res.authorId;
		})
		.then(res => res.toString());

	if (userId !== authorId)
		throw new BadRequestException(messageConstants.NO_PERMISSIONS);

	return true;
};