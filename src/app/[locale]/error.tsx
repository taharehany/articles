"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import Link from "next/link";

interface ErrorPageProps {
	error: Error;
	reset: () => void;
}

const ErrorPage = (props: ErrorPageProps) => {
	return (
		<>
			<div className='container mx-auto text-center py-16'>
				<Card>
					<CardHeader>
						<CardTitle>{props.error.message}</CardTitle>
						<CardDescription>{props.error.stack}</CardDescription>
					</CardHeader>

					<CardFooter className='flex justify-center'>
						<Button onClick={() => props.reset()}>Reset Error</Button>

						<Button asChild className='mx-4' variant={"outline"}>
							<Link href='/'>Go Home</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</>
	);
};

export default ErrorPage;
