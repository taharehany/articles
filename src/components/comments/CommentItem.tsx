import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const CommentItem = () => {
	return (
		<>
			<Card>
				<CardHeader>
					<div className='flex justify-between mb-3'>
						<CardTitle>user</CardTitle>
						<Badge variant='secondary'>2 days ago</Badge>
					</div>

					<CardDescription>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
						voluptatibus molestiae illo nesciunt eligendi. Cumque ut,
						deleniti nobis non qui sunt a, nam harum, facilis cupiditate
						perferendis repellendus doloremque deserunt?
					</CardDescription>

					<div className="flex gap-2 justify-end">
						<Button
							size='icon'
							className='rounded-full'
							variant={"destructive"}
						>
							<MdDeleteOutline size={20} />
						</Button>

						<Button size='icon' className='rounded-full'>
							<FiEdit size={20} />
						</Button>
					</div>
				</CardHeader>
			</Card>
		</>
	);
};

export default CommentItem;
