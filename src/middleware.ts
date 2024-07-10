import createMiddleware from "next-intl/middleware";
import { localePrefix, defaultLocale, locales, pathnames } from "./config";
import { NextRequest, NextResponse } from "next/server";

const middleware = createMiddleware({
	defaultLocale,
	locales,
	localePrefix,
	pathnames,
});

async function customMiddleware(request: NextRequest) {
	const response = middleware(request);
	const url = request.nextUrl;
	const pathname = url.pathname;
	const localePattern = /^\/(ar|en)\/api\/users\/profile\/\d+$/;
	const isAuthenticated = checkUserAuthentication(request);

	if (
		!isAuthenticated &&
		localePattern.test(pathname) &&
		request.method === "DELETE"
	) {
		return NextResponse.json(
			{
				message: "Unauthorized, access denied",
			},
			{
				status: 401,
			}
		);
	}

	return response;
}

function checkUserAuthentication(request: NextRequest) {
	const token = request?.cookies?.get("auth-token")?.value as string;
	return token ? true : false;
}

export default customMiddleware;

export const config = {
	matcher: ["/", "/(ar|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
