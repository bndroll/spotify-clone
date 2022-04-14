import { Body, Controller, Get, NotFoundException, Param, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersConstants } from './users.constants';


@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async findOne(@Param('id', IdValidationPipe) id: string) {
		return await this.usersService.findById(id);
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async updateById(@Param('id', IdValidationPipe) id: string, @Body() dto: UpdateUserDto) {
		const updatedUser = await this.usersService.updateById(id, dto);

		if (!updatedUser)
			throw new NotFoundException(UsersConstants.USER_NOT_FOUND);

		return updatedUser;
	}
}
