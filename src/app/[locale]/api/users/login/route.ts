import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { getLoginValidationSchema } from "@/lib/utils";
import { setTokenCookie } from "@/lib/helpers";
import { JWTPayload } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

/**
 * @method POST
 * @param request
 * @route ~/api/users/login
 * @desc Login user
 * @access public
 */
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const validation = await getLoginValidationSchema(body);

		if (!validation.success) {
			return NextResponse.json(
				{ errors: validation.error.errors },
				{ status: 400 }
			);
		}

		const user = await prisma.user.findUnique({
			where: {
				email: body.email,
			},
		});

		if (!user) {
			return NextResponse.json(
				{ message: "Invalid email or password" },
				{ status: 400 }
			);
		}

		const isPasswordMatch = await bcrypt.compare(
			body.password,
			user.password
		);

		if (!isPasswordMatch) {
			return NextResponse.json(
				{ message: "Invalid email or password" },
				{ status: 400 }
			);
		}

		const jwtPayload: JWTPayload = {
			id: user.id,
			email: user.email,
			username: user.username,
			isAdmin: user.isAdmin,
		};

		await setTokenCookie(jwtPayload);

		return NextResponse.json(
			{
				data: {
					id: user.id,
					email: user.email,
					username: user.username,
					isAdmin: user.isAdmin,
				},
				message: "Login successfully",
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}
