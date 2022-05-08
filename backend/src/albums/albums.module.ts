import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { JwtModule } from '@nestjs/jwt';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { getJwtConfig } from '../configs/jwt.config';
import { UsersModule } from '../users/users.module';
import { TracksModule } from '../tracks/tracks.module';
import { AlbumsModel } from './albums.model';
import { TracksModel } from '../tracks/tracks.model';


@Module({
	controllers: [AlbumsController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: AlbumsModel,
				schemaOptions: {
					collection: 'Albums'
				}
			}
		]),
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
		UsersModule,
		TracksModule
	],
	providers: [AlbumsService]
})
export class AlbumsModule {
}
