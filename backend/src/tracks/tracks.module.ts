import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { TracksModel } from './tracks.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../configs/jwt.config';
import { UsersModule } from '../users/users.module';


@Module({
	controllers: [TracksController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: TracksModel,
				schemaOptions: {
					collection: 'Tracks'
				}
			}
		]),
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		}),
		UsersModule
	],
	providers: [TracksService]
})
export class TracksModule {
}
