import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { getJwtConfig } from '../configs/jwt.config';
import { UsersModule } from '../users/users.module';
import { TracksModule } from '../tracks/tracks.module';
import { PlaylistsModel } from './playlists.model';


@Module({
	controllers: [PlaylistsController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: PlaylistsModel,
				schemaOptions: {
					collection: 'Playlists'
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
	providers: [PlaylistsService]
})
export class PlaylistsModule {
}
