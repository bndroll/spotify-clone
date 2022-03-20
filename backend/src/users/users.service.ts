import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from 'nestjs-typegoose';
import { UsersModel } from './users.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UsersConstants } from './users.constants';


@Injectable()
export class UsersService {
	constructor(
		@InjectModel(UsersModel) private readonly usersModel: ModelType<UsersModel>
	) {
	}

	create(createUserDto: CreateUserDto) {
		return 'This action adds a new user';
	}

	findAll() {
		return `This action returns all users`;
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

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
