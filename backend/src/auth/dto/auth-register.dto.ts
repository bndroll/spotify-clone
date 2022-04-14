import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { UsersRole } from '../../users/users.model';


export class AuthRegisterDto {
	@IsNotEmpty({message: 'Email is required prop'})
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@MinLength(3, {message: 'Name should contains at least 3 characters'})
	name: string;

	@IsNotEmpty()
	@MinLength(5, {message: 'Password should contains at least 5 characters'})
	password: string;

	@IsNotEmpty()
	@IsEnum(UsersRole, {message: 'Role can only be user or musician'})
	role: UsersRole;
}