"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";

const AddArticleForm = () => {
	const t = useTranslations("Global");
	const t2 = useTranslations("ErrorsForm");

	const formSchema = z.object({
		title: z.string({ message: t2("required", { field: t("title") }) }),
		description: z
			.string({ message: t2("required", { field: t("description") }) })
			.min(1, { message: t2("min", { min: 1, field: t("description") }) }),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 mx-auto'
				>
					<Card className={cn("w-full", "mx-auto", "bg-slate-100")}>
						<CardHeader>
							<CardTitle>Add Article</CardTitle>
						</CardHeader>

						<CardContent className='grid gap-4'>
							<FormField
								control={form.control}
								name='title'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder={t("title")}
												{...field}
												autoFocus
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='description'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Textarea
												placeholder={t("description")}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>

						<CardFooter>
							<Button type='submit'>{t("submit")}</Button>
						</CardFooter>
					</Card>
				</form>
			</Form>
		</div>
	);
};

export default AddArticleForm;