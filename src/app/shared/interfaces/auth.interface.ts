/* User Service - Auth */
export interface ISignup {
	name : string;
	email : string;
	passwords : {
		password : string;
		passwordConfirm : string;
	};
}

export interface ILogin {
	nickname : string;
	password : string;
}

export interface IReset {
	email : string;
}

export interface IRAuth {
	token ?: string;
}

/* User Service - User */
export interface IUser {
	_id : string;
	nickname : string;
	email : string;
	created_at : string;
	avatar : string;
	firstname ?: string;
	lastname ?: string;
}

export interface IRUser {
	user : IUser;
}
