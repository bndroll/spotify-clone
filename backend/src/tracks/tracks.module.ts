import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypegooseModule } from 'nestjs-typegoose';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TracksModel } from './tracks.model';
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
	providers: [TracksService],
	exports: [TracksService]
})
export class TracksModule {
}
