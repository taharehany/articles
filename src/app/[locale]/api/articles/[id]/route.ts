import { PrismaClient, Article } from "@prisma/client";
import { Record } from "@prisma/client/runtime/library";
import { getTranslations } from "next-intl/server";
import { z } from "zod";

const prisma = new PrismaClient();

/**
 * @method GET
 * @param request
 * @route ~/api/articles/:id
 * @desc Returns a single article
 * @access public
 */
export async function GET(request: Request, { params }: any) {
	try {
		const article = await prisma.article.findUnique({
			where: {
				id: parseInt(params?.id),
			},
			include: {
				comments: true,
				translations: true,
			},
		});

		if (!article) {
			return Response.json(
				{ message: "Article not found" },
				{ status: 404 }
			);
		}

		return Response.json({ data: article });
	} catch (error) {
		return Response.json(error, { status: 500 });
	}
}

/**
 * @method PUT
 * @param request
 * @route ~/api/articles/:id
 * @desc Updates an article
 * @access public
 */
export async function PUT(request: Request, { params }: any) {
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
			return new Response(
				JSON.stringify({
					errors: validation.error.errors,
					message: validation.error.errors[0].message,
				}),
				{ status: 400, headers: { "Content-Type": "application/json" } }
			);
		}

		const article = await prisma.article.findUnique({
			where: {
				id: parseInt(params?.id),
			},
			include: {
				translations: true,
			},
		});

		if (!article) {
			return new Response(JSON.stringify({ message: "Article not found" }), {
				status: 404,
				headers: { "Content-Type": "application/json" },
			});
		}

		const updateTranslations = body.translations.map(
			(translation: Record<string, string>) => {
				const existingTranslation = article.translations.find(
					(t) => t.locale === translation.locale
				);

				if (existingTranslation) {
					return prisma.translation.update({
						where: {
							id: existingTranslation.id,
						},
						data: {
							title: translation.title,
							description: translation.description,
						},
					});
				} else {
					return prisma.translation.create({
						data: {
							articleId: article.id,
							locale: translation.locale,
							title: translation.title,
							description: translation.description,
						},
					});
				}
			}
		);

		await Promise.all(updateTranslations);

		const updatedArticle = await prisma.article.findUnique({
			where: {
				id: parseInt(params?.id),
			},
			include: {
				translations: true,
			},
		});

		return new Response(JSON.stringify({ data: updatedArticle }));
	} catch (error) {
		return new Response(JSON.stringify(error), {
			status: 500,
		});
	}
}

/**
 * @method DELETE
 * @param request
 * @route ~/api/articles/:id
 * @desc Deletes an article
 * @access public
 */
export async function DELETE(request: Request, { params }: any) {
	try {
		const articleId = parseInt(params?.id);

		if (isNaN(articleId)) {
			return new Response(
				JSON.stringify({ message: "Invalid article ID" }),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				}
			);
		}

		const article = await prisma.article.findUnique({
			where: { id: articleId },
			include: { translations: true },
		});

		if (!article) {
			return new Response(JSON.stringify({ message: "Article not found" }), {
				status: 404,
			});
		}

		await prisma.translation.deleteMany({
			where: { articleId: articleId },
		});

		await prisma.article.delete({
			where: { id: articleId },
		});

		return new Response(JSON.stringify({ message: "Article deleted" }), {
			status: 200,
		});
	} catch (error) {
		return new Response(JSON.stringify({ message: "Server error", error }), {
			status: 500,
		});
	}
}
