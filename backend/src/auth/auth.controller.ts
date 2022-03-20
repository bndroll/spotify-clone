import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';


@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {
	}

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() registerDto: AuthRegisterDto) {
		return this.authService.register(registerDto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() loginDto: AuthLoginDto) {
		return this.authService.login(loginDto);
	}
}
