import { Skeleton } from "@/components/ui/skeleton";

const ArticleLoading = () => {
	return (
		<div className='container mx-auto py-10'>
			<div className='grid grid-cols-3 gap-4'>
				{[1, 2, 3, 4, 5, 6].map((item) => (
					<div className='space-y-3' key={item}>
						<Skeleton className='h-[125px] w-full rounded-xl bg-slate-300' />
						<Skeleton className='h-4 w-full bg-slate-300' />
						<Skeleton className='h-4 w-1/2 bg-slate-300' />
					</div>
				))}
			</div>
		</div>
	);
};

export default ArticleLoading;
