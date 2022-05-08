import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';
import { userIsAuthor } from '../../utils/user-is-author.util';
import { AlbumsService } from '../../albums/albums.service';
import { AlbumsConstants } from '../../albums/albums.constants';


@Injectable()
export class UserIsAlbumAuthorGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly usersService: UsersService,
		private readonly albumsService: AlbumsService
	) {
	}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest();
		const authHeader = request.headers.authorization;
		const [_, token]: [string, string] = authHeader.split(' ');

		const userJwt = this.jwtService.verify(token, this.configService.get('JWT_SECRET'));
		const album = this.albumsService.findById(request.params.id);

		return userIsAuthor(userJwt.id, album, {
			NOT_FOUND: AlbumsConstants.ALBUM_NOT_FOUND,
			NO_PERMISSIONS: AlbumsConstants.NO_PERMISSIONS
		});
	}
}