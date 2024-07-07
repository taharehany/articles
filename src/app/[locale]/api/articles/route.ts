import { z } from "zod";
import { getTranslations } from "next-intl/server";
import { PrismaClient, Article } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @method GET
 * @param request
 * @route ~/api/articles
 * @desc Returns a list of articles
 * @access public
 */
export async function GET(request: Request, { params }: any) {
	try {
		const locale = params?.locale;
		
		const articles = await prisma.article.findMany({
			include: {
				translations: {
					where: {
						locale,
					},
				},
				comments: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		// Transform articles to include title and description directly
		const transformedArticles = articles.map((article) => {
			const translation = article.translations[0] || {};
			return {
				...article,
				title: translation.title,
				description: translation.description,
				translations: undefined, // Remove translations key
			};
		});

		return new Response(
			JSON.stringify({
				data: transformedArticles,
			}),
			{
				headers: { "Content-Type": "application/json" },
			}
		);
	} catch (error) {
		return Response.json(error, { status: 500 });
	}
}

/**
 * @method POST
 * @param request
 * @route ~/api/articles
 * @desc Creates a new article
 * @access public
 */
export async function POST(request: Request) {
	try {
		const body = await request.json();
		const t = await getTranslations("Global");
		const f = await getTranslations("FormErrors");

		const createTranslationSchema = z.object({
			locale: z.string(),
			title: z
				.string({ message: f("required", { field: t("title") }) })
				.min(1, { message: f("min", { min: 1, field: t("title") }) }),
			description: z
				.string({ message: f("required", { field: t("description") }) })
				.min(1, { message: f("min", { min: 1, field: t("description") }) }),
		});

		const createArticleSchema = z.object({
			translations: z.array(createTranslationSchema).nonempty(),
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

		const newArticle = await prisma.article.create({
			data: {
				translations: {
					create: body.translations,
				},
			},
			include: {
				translations: true,
			},
		});

		return Response.json(newArticle, { status: 201 });
	} catch (error) {
		return Response.json(error, { status: 500 });
	}
}
