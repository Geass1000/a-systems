
export interface ISignup {
	name : string;
	email : string;
	passwords : {
		password : string;
		passwordConfirm : string;
	};
}

export interface ILogin {
	login : string;
	password : string;
}

export interface IReset {
	email : string;
}

export interface IRAuth {
	token ?: string;
}
