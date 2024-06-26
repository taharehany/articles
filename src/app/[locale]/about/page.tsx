import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import AboutImage from "../../../../public/about.jpg";

const AboutPage = async () => {
	return (
		<>
			<div className='container mx-auto py-10'>
				<div className='grid grid-cols-1 gap-4 text-center'>
					<Card>
						<CardHeader>
							<div className='mb-6'>
								<Image src={AboutImage} alt='About Image' className='rounded-full m-auto mb-6' />
								<Image src={"https://picsum.photos/1500"} alt='About Image' className='rounded-full m-auto mb-6' width={300} height={200} />
								<Image src={"https://picsum.photos/1500"} alt='About Image' className='rounded-full m-auto mb-6' width={200} height={200} />
								<Image src={"https://picsum.photos/1500"} alt='About Image' className='rounded-full m-auto mb-6' width={100} height={100} />
							</div>

							<CardTitle className='text-4xl'>About Us</CardTitle>

							<CardDescription>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias quisquam laudantium architecto? Eligendi adipisci consectetur vitae, culpa veniam recusandae accusantium perferendis velit doloribus ex unde nulla laborum
								ducimus labore consequatur.
							</CardDescription>
						</CardHeader>

						<CardFooter className='flex justify-center'>
							<Button asChild className='mx-4' variant={"outline"}>
								<Link href='/'>Go Home</Link>
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</>
	);
};

export default AboutPage;
