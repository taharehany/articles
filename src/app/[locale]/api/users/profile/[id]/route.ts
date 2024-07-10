import { verifyToken } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

/**
 * @method DELETE
 * @param request
 * @route ~/api/users/profile/:id
 * @desc Deletes a user
 * @access private
 */
export async function DELETE(request: NextRequest, { params }: any) {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: parseInt(params?.id),
			},
		});

		if (!user) {
			return NextResponse.json(
				{ message: "User not found" },
				{ status: 404 }
			);
		}

		const userFromToken = verifyToken(request);

		if (user.id === userFromToken?.id || userFromToken?.isAdmin) {
			await prisma.user.delete({
				where: {
					id: parseInt(params?.id),
				},
			});

			if (user.id === userFromToken?.id) {
				return NextResponse.json(
					{
						message: "Your account has been deleted",
					},
					{
						status: 200,
					}
				);
			} else {
				return NextResponse.json({ message: "User has been deleted" });
			}
		} else {
			return NextResponse.json(
				{ message: "Unauthenticated, You are not allowed" },
				{
					status: 403,
				}
			);
		}
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}

/**
 * @method Get
 * @param request
 * @route ~/api/users/profile/:id
 * @desc Returns a single user
 * @access private
 */
export async function GET(request: NextRequest, { params }: any) {
	try {
		const userFromToken = verifyToken(request);

		const user = await prisma.user.findUnique({
			where: {
				id: parseInt(params?.id),
			},
			select: {
				id: true,
				username: true,
				email: true,
				isAdmin: true,
			},
		});

		if (!user) {
			return NextResponse.json(
				{ message: "User not found" },
				{ status: 404 }
			);
		}

		if (!userFromToken || user?.id !== userFromToken?.id) {
			return NextResponse.json({
				message: "Unauthenticated, You are not allowed",
			});
		}

		return NextResponse.json(
			{
				data: user,
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}
