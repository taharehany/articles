import { z } from "zod";
import { getTranslations } from "next-intl/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { getRegisterValidationSchema } from "@/lib/utils";

const prisma = new PrismaClient();

/**
 * @method POST
 * @param request
 * @route ~/api/users/register
 * @desc Creates a new user
 * @access public
 */
export async function POST(request: Request) {
	try {
		const body = await request.json();

		const validation = await getRegisterValidationSchema(body);

		if (!validation.success) {
			return Response.json(
				{
					errors: validation.error.errors,
					message: validation.error.errors[0].message,
				},
				{ status: 400 }
			);
		}

		const user = await prisma.user.findUnique({
			where: {
				email: body.email,
			},
		});

		if (user) {
			return Response.json(
				{ message: "User already exists" },
				{ status: 400 }
			);
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(body.password, salt);
		const token = null;

		const newUser = await prisma.user.create({
			data: {
				username: body.username,
				email: body.email,
				password: hashedPassword,
			},
			select: {
				id: true,
				username: true,
				email: true,
			},
		});

		return Response.json({ ...newUser, token }, { status: 201 });
	} catch (error) {
		return Response.json(error, { status: 500 });
	}
}
