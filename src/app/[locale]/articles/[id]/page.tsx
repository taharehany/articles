import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Article } from "@/lib/types";

const ArticlesPage = async ({ params: { id } }: { params: { id: string } }) => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

	if (!response.ok) {
		throw new Error("Failed to fetch article");
	}

	const articleData: Article = await response.json();

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
