import { RoleEnum } from "../IRole";

export interface IUserToken {
	id: string;
	roles: RoleEnum[];
	username: string;
	email: string;
	address: string;
}
