function Header() {
	return (
		<>
			<footer className='bg-gray-800 text-white py-4'>
				<div className='container mx-auto px-4 text-center items-center'>
					<div className='text-sm'>© {new Date().getFullYear().toString()} Articles. All rights reserved.</div>
				</div>
			</footer>
		</>
	);
}

export default Header;
