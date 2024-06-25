import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ArticlesPage = async ({ params: { id } }: { params: { id: string } }) => {
	const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

	const articleData = await res.json();

	console.log(articleData);

	return (
		<>
			<div className='container mx-auto py-10'>
				<div className='grid grid-cols-1 gap-4 text-center'>
					<Card key={articleData?.id}>
						<CardHeader>
							<CardTitle>{articleData?.title}</CardTitle>
							<CardDescription>{articleData?.body}</CardDescription>
						</CardHeader>
					</Card>
				</div>
			</div>
		</>
	);
};

export default ArticlesPage;
