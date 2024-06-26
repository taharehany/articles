import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const Index = () => {
	return (
		<>
			<div className='container mx-auto text-center py-16'>
				<div className='mb-4 h-80 relative rounded-full m-auto overflow-hidden'>
					<Image src={"https://picsum.photos/2500/1000"} alt='Hero Image' className='w-full object-cover object-center absolute' width={600} height={250} />
				</div>

				<h1 className='text-4xl mb-4'>Home Page</h1>
				<p className='text-xl mb-4'>
					This is the home page of the app Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex explicabo possimus corporis quos? Ad error debitis maxime distinctio odio et, minima quasi, corporis quo assumenda laboriosam voluptate,
					repellendus atque perspiciatis!
				</p>

				<Button asChild className='mx-4' variant={"outline"}>
					<Link href='/about'>Go to About</Link>
				</Button>
			</div>
		</>
	);
};

export default Index;
