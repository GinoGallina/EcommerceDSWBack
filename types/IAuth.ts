// Login
export interface ILoginRequest {
	email: string;
	password: string;
}

export interface ILoginResponse {
	token: string;
}

// Register
export interface IRegisterRequest {
	Email: string;
	Username: string;
	Password: string;
	Address: string;
	Roles: string[];
	StoreName?: string; // Seller
	StoreDescription?: string; // Seller
	Cbu?: string; // Seller
	Cuit?: string; // Seller
}

export interface IRegisterResponse {
	token: string;
}
