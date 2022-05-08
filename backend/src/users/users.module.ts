import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersModel } from './users.model';
import { getJwtConfig } from '../configs/jwt.config';


@Module({
	controllers: [UsersController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UsersModel,
				schemaOptions: {
					collection: 'Users'
				}
			}
		]),
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		})
	],
	providers: [UsersService],
	exports: [UsersService]
})
export class UsersModule {
}
