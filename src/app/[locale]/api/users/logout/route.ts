import { NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * @method GET
 * @param request
 * @route ~/api/users/logout
 * @desc Logout user
 * @access public
 */
export async function GET() {
	try {
		cookies().delete("auth-token");

		return NextResponse.json(
			{ message: "Logged out successfully" },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}
