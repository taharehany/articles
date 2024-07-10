import { cookies } from "next/headers";
import { generateToken } from "./utils";
import { JWTPayload } from "./types";

export async function setTokenCookie(jwtPayload: JWTPayload) {
	const token = await generateToken(jwtPayload);

	return cookies().set("auth-token", token, {
		maxAge: 6 * 60 * 60,
		expires: new Date(Date.now() + 6 * 60 * 60 * 1000),
		httpOnly: true,
		sameSite: "strict",
		path: "/",
	});
}
