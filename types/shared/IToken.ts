import { RoleEnum } from "../IRole";

export interface IToken {
	user: IUserToken;
}
export interface IUserToken {
	id: string;
	roles: RoleEnum[];
	username: string;
	email: string;
	address: string;
}

export interface AuthenticatedRequest extends Request {
	auth?: IUserToken;
}
