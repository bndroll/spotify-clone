import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcryptjs';
import { UsersModel } from '../users/users.model';
import { AuthConstants } from './auth.constants';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';


@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UsersModel)
		private readonly usersModel: ModelType<UsersModel>,
		private readonly jwtService: JwtService
	) {
	}

	async register(registerDto: AuthRegisterDto) {
		const oldUser = await this.findUser(registerDto.email);

		if (oldUser)
			throw new BadRequestException(AuthConstants.ALREADY_REGISTERED);

		const salt = await genSalt(10);

		const newUser = new this.usersModel({
			email: registerDto.email,
			name: registerDto.name,
			role: registerDto.role,
			passwordHash: await hash(registerDto.password, salt)
		});

		return newUser.save();
	}

	async login(loginDto: AuthLoginDto) {
		const payload = await this.validateUser(loginDto.email, loginDto.password);

		return {
			access_token: await this.jwtService.signAsync(payload)
		};
	}

	async findUser(email: string) {
		return this.usersModel.findOne({email}).exec();
	}

	async validateUser(email: string, password: string): Promise<Pick<UsersModel, 'email'>> {
		const user = await this.findUser(email);

		if (!user)
			throw new UnauthorizedException(AuthConstants.USER_NOT_FOUND);

		const isCorrectPassword = await compare(password, user.passwordHash);

		if (!isCorrectPassword)
			throw new UnauthorizedException(AuthConstants.WRONG_PASSWORD);

		return {
			email: user.email
		};
	}
}
