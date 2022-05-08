import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsersModel } from '../users/users.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from '../configs/jwt.config';
import { AlbumsModel } from '../albums/albums.model';
import { TracksModel } from '../tracks/tracks.model';


@Module({
	controllers: [SearchController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UsersModel,
				schemaOptions: {
					collection: 'Users'
				}
			}
		]),
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
		})
	],
	providers: [SearchService]
})
export class SearchModule {
}
