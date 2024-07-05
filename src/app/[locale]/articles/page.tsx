import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Article } from "@/lib/types";
import SearchArticle from "@/components/articles/SearchArticle";
import PaginationComponent from "@/components/Pagination";

const ArticlesPage = async () => {
	const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
		cache: "no-store",
	});

	if (!response.ok) {
		throw new Error("Failed to fetch articles");
	}

	const articlesData: Article[] = await response.json();

	return (
		<>
			<div className='container mx-auto py-10'>
				<SearchArticle />

				<div className='grid grid-cols-3 gap-4'>
					{articlesData.map((article: any) => (
						<Card key={article?.id}>
							<CardHeader>
								<CardTitle>{article?.title}</CardTitle>
								<CardDescription>{article?.body}</CardDescription>
							</CardHeader>

							<CardFooter>
								<Button asChild>
									<Link href={`/articles/${article?.id}`}>
										Go to article
									</Link>
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>

				<PaginationComponent />
			</div>
		</>
	);
};

export default ArticlesPage;
