import AddCommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Article } from "@/lib/types";

const ArticlesPage = async ({ params: { id } }: { params: { id: string } }) => {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${id}`
	);

	if (!response.ok) {
		throw new Error("Failed to fetch article");
	}

	const articleData: Article = await response.json();

	return (
		<>
			<div className='container mx-auto py-10'>
				<div className='grid grid-cols-1 gap-4 text-center mb-10'>
					<Card>
						<CardHeader>
							<CardTitle>{articleData?.title}</CardTitle>
							<CardDescription>{articleData?.body}</CardDescription>
						</CardHeader>
					</Card>
				</div>

				<h2 className='text-2xl my-4'>Comments</h2>

				<div className='grid grid-cols-1 gap-4 mb-6'>
					<CommentItem />
				</div>

				<AddCommentForm />
			</div>
		</>
	);
};

export default ArticlesPage;
