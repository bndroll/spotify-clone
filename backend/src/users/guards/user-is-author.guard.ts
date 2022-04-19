import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users.service';
import { Observable } from 'rxjs';
import { TracksService } from '../../tracks/tracks.service';
import { userIsAuthor } from '../../utils/user-is-author.util';


@Injectable()
export class UserIsAuthorGuard implements CanActivate {
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
		const user = this.usersService.findById(userJwt.id);
		const track = this.tracksService.findById(request.params.id);

		return userIsAuthor(user, track);
	}
}