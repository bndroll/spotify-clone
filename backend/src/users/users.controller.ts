import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	Patch,
	UploadedFile,
	UseGuards,
	UseInterceptors
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersConstants } from './users.constants';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserIsUserGuard } from './guards/user-is-user.guard';


@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService
	) {
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	async findOne(@Param('id', IdValidationPipe) id: string) {
		return await this.usersService.findById(id);
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	@UseGuards(UserIsUserGuard)
	async updateById(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: UpdateUserDto) {

		const updatedUser = await this.usersService.updateById(id, dto);

		if (!updatedUser)
			throw new NotFoundException(UsersConstants.USER_NOT_FOUND);

		return updatedUser;
	}

	@Patch(':id/photo')
	@UseGuards(JwtAuthGuard)
	@UseGuards(UserIsUserGuard)
	@UseInterceptors(FileInterceptor('file'))
	async updatePhotoById(
		@UploadedFile() file: Express.Multer.File,
		@Param('id', IdValidationPipe) id: string) {

		const updatedUser = await this.usersService.updatePhotoById(id, file);

		if (!updatedUser)
			throw new NotFoundException(UsersConstants.USER_NOT_FOUND);

		return updatedUser;
	}
}
