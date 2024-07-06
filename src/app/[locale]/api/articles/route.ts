import { z } from "zod";
import { getTranslations } from "next-intl/server";

/**
 * @method GET
 * @param request
 * @route ~/api/articles
 * @desc Returns a list of articles
 * @access public
 */

export async function GET(request: Request, { params }: any) {
	console.log({ params });

	return Response.json({
		data: await (
			await fetch("https://jsonplaceholder.typicode.com/posts")
		).json(),
	});
}

/**
 * @method POST
 * @param request
 * @route ~/api/articles
 * @desc Creates a new article
 * @access public
 */

export async function POST(request: Request) {
	const body = await request.json();
	const t = await getTranslations("Global");
	const f = await getTranslations("FormErrors");

	const createArticleSchema = z.object({
		title: z
			.string({ message: f("required", { field: t("title") }) })
			.min(1, { message: f("min", { min: 1, field: t("title") }) }),
		description: z.string().min(1),
	});

	const validation = createArticleSchema.safeParse(body);

	if (!validation.success) {
		return Response.json(
			{
				errors: validation.error.errors,
				message: validation.error.errors[0].message,
			},
			{ status: 400 }
		);
	}

	const newArticle = {
		title: body.title,
		description: body.description,
		id: Math.floor(Math.random() * 1000),
		userId: 1,
	};

	return Response.json(newArticle, { status: 201 });
}
