export type Article = {
	id: number;
	title: string;
	body: string;
};

export interface JWTPayload {
	id: number;
	username: string;
	email: string;
	isAdmin: boolean;
}
