"use client";

import { useParams } from "next/navigation";
import { ChangeEvent, ReactNode, useTransition } from "react";
import { useRouter, usePathname } from "@/navigation";

type Props = {
	children: ReactNode;
	defaultValue: string;
	label: string;
};

export default function LocaleSwitcherSelect({
	children,
	defaultValue,
}: Props) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const pathname = usePathname();
	const params = useParams();

	function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
		const nextLocale = event.target.value;

		startTransition(() => {
			// @ts-expect-error -- TypeScript will validate that only known `params`
			router.replace({ pathname, params }, { locale: nextLocale });
			router.refresh();
		});
	}

	return (
		<label>
			<select
				className='inline-flex appearance-none py-1 pl-2 pr-6'
				defaultValue={defaultValue}
				disabled={isPending}
				onChange={onSelectChange}
			>
				{children}
			</select>
		</label>
	);
}
