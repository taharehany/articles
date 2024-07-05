import { AiOutlineLoading } from "react-icons/ai";

const loading = () => {
	return (
		<>
			<div className='w-full h-full absolute flex items-center justify-center'>
				<AiOutlineLoading className='h-10 w-10 animate-spin' />
			</div>
		</>
	);
};

export default loading;
