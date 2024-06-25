"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import LocaleSwitcher from "./LocaleSwitcher";
import { SiBisecthosting } from "react-icons/si";
import { CiMenuBurger } from "react-icons/ci";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

function Header() {
	const t = useTranslations("Global");
	const [toggle, setToggle] = useState(false);

	return (
		<div>
			<header className='bg-gray-800 shadow-md'>
				<div className='flex justify-between items-center container mx-auto px-6 py-4'>
					<div className='flex items-center cursor-pointer'>
						<div className='md:hidden'>{!toggle ? <CiMenuBurger className='text-white text-2xl me-5' onClick={() => setToggle(!toggle)} /> : <IoCloseOutline className='text-white text-2xl me-5' onClick={() => setToggle(!toggle)} />}</div>

						<div className='text-white font-bold text-2xl'>
							<Link href='/' className='flex items-center gap-2'>
								<SiBisecthosting />
								Articles
							</Link>
						</div>
					</div>

					<nav className={`sm:static ${toggle ? "block" : "hidden"} sm:block`}>
						<ul className='absolute top-16 left-0 w-full bg-black p-4 flex flex-col gap-4 text-white font-semibold sm:relative sm:flex-row sm:items-center sm:justify-between sm:bg-transparent sm:p-0'>
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
