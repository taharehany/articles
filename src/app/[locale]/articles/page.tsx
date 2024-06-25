import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const ArticlesPage = async () => {
	const res = await fetch("https://jsonplaceholder.typicode.com/posts");

	const articlesData = await res.json();

	console.log(articlesData);

	return (
		<>
			<div className='container mx-auto py-10'>
				<div className='grid grid-cols-2 gap-4'>
					{articlesData.map((article: any) => (
						<Card key={article?.id}>
							<CardHeader>
								<CardTitle>{article?.title}</CardTitle>
								<CardDescription>{article?.body}</CardDescription>
							</CardHeader>
							<CardFooter>
								<Button asChild>
									<Link href={`/articles/${article?.id}`}>Go to article</Link>
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</>
	);
};

export default ArticlesPage;
