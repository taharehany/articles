"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "next-intl";

function RegisterPage() {
	const t = useTranslations("Global");
	const t2 = useTranslations("ErrorsForm");

	const formSchema = z.object({
		name: z.string({ message: t2("required", { field: t("name") }) }).min(1, {
			message: t2("min", { min: 1, field: t("name") }),
		}),
		email: z
			.string({ message: t2("required", { field: t("email") }) })
			.email({ message: t2("invalid_email") }),
		password: z
			.string({ message: t2("required", { field: t("password") }) })
			.min(6, { message: t2("min", { min: 6, field: t("password") }) }),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<>
			<div className='container mx-auto py-12'>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-8 mx-auto'
					>
						<Card className={cn("w-[650px]", "mx-auto")}>
							<CardHeader>
								<CardTitle>{t("register")}</CardTitle>
								<CardDescription>
									{t("register_description")}
								</CardDescription>
							</CardHeader>

							<CardContent className='grid gap-4'>
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("name")}</FormLabel>
											<FormControl>
												<Input
													placeholder={t("name")}
													{...field}
													autoComplete='name'
													autoFocus
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("email")}</FormLabel>
											<FormControl>
												<Input
													placeholder={t("email")}
													{...field}
													autoComplete='email'
													autoFocus
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='password'
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("password")}</FormLabel>
											<FormControl>
												<Input
													placeholder={t("password")}
													{...field}
													type='password'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</CardContent>

							<CardFooter>
								<Button type='submit'>{t("signup")}</Button>
							</CardFooter>
						</Card>
					</form>
				</Form>
			</div>
		</>
	);
}

export default RegisterPage;
