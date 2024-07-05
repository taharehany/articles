import Link from "next/link";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import React from "react";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";

const AdminSideBar = () => {
	const t = useTranslations("Global");
	const locale = useLocale();

	return (
		<>
			<div className='h-screen dark:bg-slate-900'>
				<aside
					id='sidebar'
					className='z-40 h-screen w-64 transition-transform'
					aria-label='Sidebar'
				>
					<div className='flex h-full flex-col overflow-y-auto border-e border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-slate-900'>
						<Link
							href='/admin'
							className='mb-10 flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white'
						>
							<svg
								className='lucide lucide-command h-5 w-5'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								stroke-width='2'
								stroke-linecap='round'
								stroke-linejoin='round'
							>
								<path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
							</svg>
							<span className='ml-3 text-base font-semibold'>
								{t("dashboard")}
							</span>
						</Link>

						<NavigationMenu dir={locale === "ar" ? "rtl" : "ltr"}>
							<NavigationMenuList>
								<NavigationMenuItem>
									<Link
										href='/admin/articles-table'
										legacyBehavior
										passHref
									>
										<NavigationMenuLink
											className={navigationMenuTriggerStyle()}
										>
											{t("articles")}
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<Link
										href='/admin/comments-table'
										legacyBehavior
										passHref
									>
										<NavigationMenuLink
											className={navigationMenuTriggerStyle()}
										>
											{t("comments")}
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</div>
				</aside>
			</div>
		</>
	);
};

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li className='text-start'>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"select-none space-y-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className
					)}
					{...props}
				>
					<div className='text-sm font-medium leading-none'>{title}</div>
					<p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";

export default AdminSideBar;
