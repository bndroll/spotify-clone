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
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersConstants } from './users.constants';
import { UserIsUserGuard } from './guards/user-is-user.guard';
import { User } from './decorators/users.decorator';


@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService
	) {
	}

	@Get('musicians')
	@UseGuards(JwtAuthGuard)
	async findMusicians() {
		return await this.usersService.findMusicians();
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	async findMusicianById(@Param('id', IdValidationPipe) id: string) {
		const user = await this.usersService.findById(id);

		if (!user || user.role === 'user')
			throw new NotFoundException(UsersConstants.USER_NOT_FOUND);

		return user;
	}

	@Get('find/me')
	@UseGuards(JwtAuthGuard)
	async findMe(@User('id') userId: string) {
		const user = await this.usersService.findById(userId);

		if (!user)
			throw new NotFoundException(UsersConstants.USER_NOT_FOUND);

		return user;
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
