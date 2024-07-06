/**
 * @method GET
 * @param request
 * @route ~/api/articles/:id
 * @desc Returns a single article
 * @access public
 */
export async function GET(request: Request, { params }: any) {
	console.log({ params });

	return Response.json({
		data: await (
			await fetch("https://jsonplaceholder.typicode.com/posts/" + params.id)
		).json(),
	});
}

/**
 * @method PUT
 * @param request
 * @route ~/api/articles/:id
 * @desc Updates an article
 * @access public
 */
export async function PUT(request: Request, { params }: any) {
	const body = await request.json();

	return Response.json({
		data: await (
			await fetch(
				"https://jsonplaceholder.typicode.com/posts/" + params.id,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(body),
				}
			)
		).json(),
		message: "Article updated",
	});
}

/**
 * @method DELETE
 * @param request
 * @route ~/api/articles/:id
 * @desc Deletes an article
 * @access public
 */
export async function DELETE(request: Request, { params }: any) {
	return Response.json({
		data: await (
			await fetch(
				"https://jsonplaceholder.typicode.com/posts/" + params.id,
				{
					method: "DELETE",
				}
			)
		).json(),
		message: "Article deleted",
	});
}
