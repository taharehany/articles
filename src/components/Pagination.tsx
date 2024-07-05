import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationLink,
	PaginationNext,
} from "@/components/ui/pagination";

const PaginationComponent = () => {
	const pages = [1, 2, 3, 4, 5];

	return (
		<>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href='#' />
					</PaginationItem>

					{pages.map((page) => (
						<PaginationItem key={page}>
							<PaginationLink href='#'>{page}</PaginationLink>
						</PaginationItem>
					))}

					<PaginationItem>
						<PaginationNext href='#' />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</>
	);
};

export default PaginationComponent;
