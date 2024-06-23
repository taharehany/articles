import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import LocaleSwitcher from "./LocaleSwitcher";

function Header() {
	const t = useTranslations("Global");

	return (
		<div>
			<header className='bg-gray-800 shadow-md'>
				<div className='flex justify-between items-center container mx-auto px-6 py-4'>
					<div className='flex items-center'>
						<div className='text-white font-bold text-2xl'>
							<Link href='/'>Articles</Link>
						</div>
					</div>

					<nav>
						<ul className='flex gap-4 text-white font-semibold'>
							<li>
								<Link href='/'>
									<span className='hover:text-gray-200 transition-colors duration-200'>{t("home")}</span>
								</Link>
							</li>
							<li>
								<Link href='/articles'>
									<span className='hover:text-gray-200 transition-colors duration-200'>{t("articles")}</span>
								</Link>
							</li>
							<li>
								<Link href='/about'>
									<span className='hover:text-gray-200 transition-colors duration-200'>{t("about")}</span>
								</Link>
							</li>
						</ul>
					</nav>

					<div className='flex gap-4 items-center'>
						<Link href='/login'>
							<span className='text-white hover:text-gray-200 transition-colors duration-200'>{t("login")}</span>
						</Link>
						<Link href='/register'>
							<span className='text-white hover:text-gray-200 transition-colors duration-200'>{t("register")}</span>
						</Link>
						<LocaleSwitcher />
					</div>
				</div>
			</header>
		</div>
	);
}

export default Header;
