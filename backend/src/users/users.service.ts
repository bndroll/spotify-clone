import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { UsersModel } from './users.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UsersConstants } from './users.constants';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {
	constructor(
		@InjectModel(UsersModel) private readonly usersModel: ModelType<UsersModel>
	) {
	}

	async findById(id: string) {
		const user = await this.usersModel.findById(id).exec();

		if (!user)
			throw new NotFoundException(UsersConstants.USER_NOT_FOUND);

		return user;
	}

	async findByEmail(email: string) {
		const user = await this.usersModel.find({email}).exec();

		if (!user)
			throw new NotFoundException(UsersConstants.USER_NOT_FOUND);

		return user;
	}

	async updateById(id: string, dto: UpdateUserDto) {
		return this.usersModel.findByIdAndUpdate(id, dto, {new: true}).exec();
	}
}
