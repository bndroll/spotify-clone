import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthConstants } from './auth.constants';


@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {
	}

	@Post('register')
	@UsePipes(new ValidationPipe())
	async register(@Body() registerDto: AuthRegisterDto) {
		const oldUser = await this.authService.findByEmail(registerDto.email);

		if (oldUser)
			throw new BadRequestException(AuthConstants.ALREADY_REGISTERED);

		return this.authService.register(registerDto);
	}

	@Post('login')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	async login(@Body() loginDto: AuthLoginDto) {
		return this.authService.login(loginDto);
	}
}
