export interface IRegisterUser {
	email: string;
	password: string;
	name: string;
	role: string;
}

export interface ILoginUser {
	email: string;
	password: string;
}

export interface IRegisterUserResponse {
	_id: string;
	email: string;
	name: string;
	role: string;
	photo: string;
	about: string;
}

export interface ILoginUserResponse {
	access_token: string;
}