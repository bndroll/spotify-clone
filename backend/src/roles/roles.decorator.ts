import { UsersRole } from '../users/users.model';
import { SetMetadata } from '@nestjs/common';
import { RolesConstants } from './roles.constants';


export const Role = (role: UsersRole) =>
	SetMetadata(RolesConstants.ROLE_KEY, role);