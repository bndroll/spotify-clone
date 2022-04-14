import { IsEmail, IsNotEmpty } from 'class-validator';


export class AuthLoginDto {
	@IsEmail()
	@IsNotEmpty({message: 'Email is required prop'})
	email: string;

	@IsNotEmpty()
	@IsNotEmpty({message: 'Password is required prop'})
	password: string;
}