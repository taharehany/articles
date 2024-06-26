"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const LoginPage = () => {
	const t = useTranslations("Global");
	const t2 = useTranslations("ErrorsForm");

	const formSchema = z.object({
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
								<CardTitle>{t("login")}</CardTitle>
								<CardDescription>
									{t("login_description")}
								</CardDescription>
							</CardHeader>

							<CardContent className='grid gap-4'>
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
								<Button type='submit'>{t("login")}</Button>
							</CardFooter>
						</Card>
					</form>
				</Form>
			</div>
		</>
	);
};

export default LoginPage;
