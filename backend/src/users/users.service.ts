import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ConfigService } from '@nestjs/config';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { UsersModel } from './users.model';
import { UpdateUserDto } from './dto/update-user.dto';
import { photoFilePostRequest } from '../api/file-system/profile/photo-post.request';


@Injectable()
export class UsersService {
	constructor(
		@InjectModel(UsersModel)
		private readonly usersModel: ModelType<UsersModel>,
		private readonly configService: ConfigService
	) {
	}

	async findById(id: string): Promise<DocumentType<UsersModel>> {
		return await this.usersModel.findById(id).exec();
	}

	async updateById(id: string, dto: UpdateUserDto): Promise<DocumentType<UsersModel>> {
		const user: UsersModel = await this.findById(id);

		let userName = user.name;
		let about = user.about;

		if (dto.name !== null)
			userName = dto.name;

		if (dto.about !== null)
			about = dto.about;

		const resultDto: UpdateUserDto = {
			name: userName,
			about: about
		};

		return this.usersModel.findByIdAndUpdate(id, resultDto, {new: true}).exec();
	}

	async updatePhotoById(id: string, file: Express.Multer.File): Promise<DocumentType<UsersModel>> {
		const user: UsersModel = await this.findById(id);

		await photoFilePostRequest({
			file: file,
			userName: user.name
		}, this.configService);

		const photo = `/profile/${user.name}`;

		return this.usersModel.findByIdAndUpdate(id, {photo}, {new: true}).exec();
	}
}
