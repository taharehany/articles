interface Props {
	searchParams: {
		searchText: string;
	};
}

const SearchArticlesPage = ({ searchParams }: Props) => {
	return (
		<div className='container mx-auto py-10'>
			search is:{searchParams?.searchText}
		</div>
	);
};

export default SearchArticlesPage;
