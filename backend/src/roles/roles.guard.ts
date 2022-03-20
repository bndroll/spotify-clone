import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RolesConstants } from './roles.constants';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { checkRole } from '../utils/check-role.util';


@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly usersService: UsersService
	) {
	}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const requiredRole = this.reflector.getAllAndOverride<string>(RolesConstants.ROLE_KEY, [
			context.getHandler(),
			context.getClass()
		]);

		if (!requiredRole)
			return true;

		const request = context.switchToHttp().getRequest();
		const authHeader = request.headers.authorization;
		const [bearer, token] = authHeader.split(' ');

		const userJwt = this.jwtService.verify(token, this.configService.get('JWT_SECRET'));
		const user = this.usersService.findByEmail(userJwt.email);

		return checkRole(user, requiredRole);
	}
}