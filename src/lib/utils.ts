import { z } from "zod";
import { getTranslations } from "next-intl/server";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";
import { JWTPayload } from "./types";
import { NextRequest } from "next/server";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function getLoginValidationSchema(body: any) {
	const t = await getTranslations("Global");
	const f = await getTranslations("FormErrors");

	const schema = z.object({
		email: z
			.string({ message: f("required", { field: t("email") }) })
			.email({ message: t("email") }),
		password: z
			.string({ message: f("required", { field: t("password") }) })
			.min(1, { message: f("min", { min: 1, field: t("password") }) }),
	});

	const validation = schema.safeParse(body);

	return validation;
}

export async function getRegisterValidationSchema(body: any) {
	const t = await getTranslations("Global");
	const f = await getTranslations("FormErrors");

	const schema = z.object({
		username: z
			.string({ message: f("required", { field: t("username") }) })
			.min(1, { message: f("min", { min: 1, field: t("username") }) })
			.max(32, { message: f("max", { max: 32, field: t("username") }) }),
		email: z
			.string({ message: f("required", { field: t("email") }) })
			.email({ message: t("email") })
			.min(1, { message: f("min", { min: 1, field: t("email") }) }),
		password: z
			.string({ message: f("required", { field: t("password") }) })
			.min(1, { message: f("min", { min: 1, field: t("password") }) }),
	});

	const validation = schema.safeParse(body);

	return validation;
}

export async function generateToken(jwtPayload: JWTPayload): Promise<string> {
	const token = jwt.sign(jwtPayload, process.env.JWT_SECRET as string, {
		expiresIn: "6d",
	});

	return token;
}

export function verifyToken(request: NextRequest): JWTPayload | null {
	try {
		const authToken = request?.cookies?.get("auth-token")?.value as string;

		const user = jwt.verify(
			authToken,
			process.env.JWT_SECRET as string
		) as JWTPayload;

		if (!user) {
			return null;
		}

		return user;
	} catch (error) {
		return null;
	}
}
