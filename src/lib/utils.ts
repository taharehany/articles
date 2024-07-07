import { z } from "zod";
import { getTranslations } from "next-intl/server";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";

interface JWTPayload {
	id: number;
	username: string;
	email: string;
	isAdmin: boolean;
}

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
