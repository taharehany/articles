export const dynamic = "force-dynamic";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

const NotFoundPage = () => {
	return (
		<>
			<div className='container mx-auto text-center py-16'>
				<Card>
					<CardHeader>
						<CardTitle className='text-8xl'>404</CardTitle>
						<CardDescription className='text-2xl'>
							Page Not Found
						</CardDescription>
					</CardHeader>

					<CardFooter className='flex justify-center'>
						<Button asChild className='mx-4' variant={"outline"}>
							<Link href='/'>Go Home</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</>
	);
};

export default NotFoundPage;
