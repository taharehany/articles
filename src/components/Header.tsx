import { useLocale } from "next-intl";
import Link from "next/link";

function Header() {
	const locale = useLocale();

	return (
		<div>
			<header className='bg-gradient-to-r from-red-400 to-red-300 shadow-md'>
				<div className='flex justify-between items-center container mx-auto px-6 py-4'>
					<div className='flex items-center'>
						<div className='text-white font-bold text-2xl'>
							<Link href={`/${locale}`}>Articles</Link>
						</div>
					</div>

					<nav>
						<ul className='flex space-x-6 text-white font-semibold'>
							<li>
								<Link href={`/${locale}`}>
									<span className='hover:text-gray-200 transition-colors duration-200'>Home</span>
								</Link>
							</li>
							<li>
								<Link href={`/${locale}/articles`}>
									<span className='hover:text-gray-200 transition-colors duration-200'>Articles</span>
								</Link>
							</li>
							<li>
								<Link href={`/${locale}/about`}>
									<span className='hover:text-gray-200 transition-colors duration-200'>About</span>
								</Link>
							</li>
						</ul>
					</nav>

					<div className='flex gap-4'>
						<Link href={`/${locale}/login`}>
							<span className='text-white hover:text-gray-200 transition-colors duration-200'>Login</span>
						</Link>
						<Link href={`/${locale}/register`}>
							<span className='text-white hover:text-gray-200 transition-colors duration-200'>Register</span>
						</Link>
					</div>
				</div>
			</header>
		</div>
	);
}

export default Header;
