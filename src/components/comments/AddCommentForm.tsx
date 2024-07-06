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
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";

const AddCommentForm = () => {
	const t = useTranslations("Global");
	const t2 = useTranslations("FormErrors");

	const formSchema = z.object({
		comment: z
			.string({ message: t2("required", { field: t("comment") }) })
			.min(1, { message: t2("min", { min: 1, field: t("comment") }) }),
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
					<Card className={cn("w-full", "mx-auto", "bg-slate-200")}>
						<CardHeader>
							<CardTitle>Add Comment</CardTitle>
						</CardHeader>

						<CardContent className='grid gap-4'>
							<FormField
								control={form.control}
								name='comment'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Textarea
												placeholder={t("comment")}
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

export default AddCommentForm;
