import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';


export class UpdateUserDto {
	@IsString()
	@IsOptional()
	@MinLength(3, {message: 'Name should contains at least 3 characters'})
	name?: string;

	@IsString()
	@IsOptional()
	@MaxLength(350, {message: 'About can contains a maximum of 350 characters'})
	about?: string;
}