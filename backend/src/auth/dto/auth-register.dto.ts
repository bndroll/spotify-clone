import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { UsersRole } from '../../users/users.model';


export class AuthRegisterDto {
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@MinLength(3, {message: 'Name should contains at least 3 characters'})
	name: string;

	@IsNotEmpty()
	@MinLength(5, {message: 'Password should contains at least 5 characters'})
	password: string;

	@IsNotEmpty()
	role: UsersRole;
}