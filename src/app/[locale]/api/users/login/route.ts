import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateToken, getLoginValidationSchema } from "@/lib/utils";

const prisma = new PrismaClient();

/**
 * @method POST
 * @param request
 * @route ~/api/users/login
 * @desc Logs in a user
 * @access public
 */
export async function POST(request: Request) {
	try {
		const body = await request.json();

		const validation = await getLoginValidationSchema(body);

		if (!validation.success) {
			return Response.json(validation.error.issues, { status: 400 });
		}

		const user = await prisma.user.findUnique({
			where: {
				email: body.email,
			},
		});

		if (!user) {
			return Response.json(
				{ message: "Invalid email or password" },
				{ status: 400 }
			);
		}

		const isPasswordMatch = await bcrypt.compare(
			body.password,
			user.password
		);

		if (!isPasswordMatch) {
			return Response.json(
				{ message: "Invalid email or password" },
				{ status: 400 }
			);
		}

		const jwtPayload: any = {
			email: user.email,
			username: user.username,
			isAdmin: user.isAdmin,
		};

		const token = await generateToken(jwtPayload);

		return Response.json({
			data: {
				email: user.email,
				username: user.username,
				isAdmin: user.isAdmin,
				token,
			},
			message: "Login successfully",
		});
	} catch (error) {
		return Response.json(error, { status: 500 });
	}
}
