import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';
import { TracksService } from '../../tracks/tracks.service';
import { userIsAuthor } from '../../utils/user-is-author.util';
import { TracksConstants } from '../../tracks/tracks.constants';


@Injectable()
export class UserIsTrackAuthorGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly usersService: UsersService,
		private readonly tracksService: TracksService
	) {
	}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest();
		const authHeader = request.headers.authorization;
		const [_, token]: [string, string] = authHeader.split(' ');

		const userJwt = this.jwtService.verify(token, this.configService.get('JWT_SECRET'));
		const track = this.tracksService.findById(request.params.id);

		return userIsAuthor(userJwt.id, track, {
			NOT_FOUND: TracksConstants.TRACK_NOT_FOUND,
			NO_PERMISSIONS: TracksConstants.NO_PERMISSIONS
		});
	}
}