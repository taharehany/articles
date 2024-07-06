"use client";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const SearchArticle = () => {
	const t = useTranslations("Global");
	const t2 = useTranslations("FormErrors");
	const router = useRouter();

	const formSchema = z.object({
		search: z.string({ message: t2("required", { field: t("search") }) }),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);

		router.push(`/articles/search?searchText=${values.search}`);
	}

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 mx-auto mb-4'
				>
					<Card className={cn("w-full", "mx-auto p-4", "bg-slate-100")}>
						<div className='flex gap-4'>
							<div className='w-full'>
								<FormField
									control={form.control}
									name='search'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													placeholder={t("search")}
													{...field}
													autoFocus
													type='search'
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>

							<Button type='submit'>{t("submit")}</Button>
						</div>
					</Card>
				</form>
			</Form>
		</>
	);
};

export default SearchArticle;
