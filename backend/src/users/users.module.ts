import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsersModel } from './users.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
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
	providers: [UsersService]
})
export class UsersModule {
}
