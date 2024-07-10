import { z } from "zod";
import { getTranslations } from "next-intl/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { getRegisterValidationSchema } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { setTokenCookie } from "@/lib/helpers";

const prisma = new PrismaClient();

/**
 * @method POST
 * @param request
 * @route ~/api/users/register
 * @desc Creates a new user
 * @access public
 */
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const validation = await getRegisterValidationSchema(body);

		if (!validation.success) {
			return NextResponse.json(
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
			return NextResponse.json(
				{ message: "User is already exists" },
				{ status: 400 }
			);
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(body.password, salt);

		const newUser = await prisma.user.create({
			data: {
				username: body.username,
				email: body.email,
				password: hashedPassword,
			},
			select: {
				id: true,
				email: true,
				username: true,
				isAdmin: true,
			},
		});

		await setTokenCookie({
			id: newUser.id,
			email: newUser.email,
			username: newUser.username,
			isAdmin: newUser.isAdmin,
		});

		return NextResponse.json({
			data: {
				user: newUser,
				message: "User created successfully",
			},
			status: 201,
		});
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}
