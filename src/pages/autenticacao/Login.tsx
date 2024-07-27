import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthUser from "@/hooks/useAuthUser";

const formSchema = z.object({
	email: z.string().email("Informe um email válido"),
	senha: z.string().min(6, "A senha deve ter ao menos 6 caracteres"),
});

export function Login() {
	const { loginWithSocialProvider, login } = useAuthUser();

	async function handleLoginWithGoogle() {
		try {
			await loginWithSocialProvider("google");
		} catch (error) {
			toast({
				title: "Ops!",
				description: error.message ,
				variant: "destructive",
			});
		}
	}

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			senha: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			await login(values);
		} catch (error) {
			toast({
				title: "Ops!",
				description: "Email e/ou senha incorretos!",
				variant: "destructive",
			});
		}
	}

	return (
		<div className="flex h-screen items-center justify-center">
			<Card className="w-full max-w-sm m-4">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>Bem vindo de volta!</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<Button
							variant="outline"
							className="w-full gap-3"
							onClick={handleLoginWithGoogle}
						>
							<FontAwesomeIcon icon={faGoogle} size="lg" />
							Entrar com Google
						</Button>
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-muted-foreground">
									OU
								</span>
							</div>
						</div>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-3"
							>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													type="email"
													placeholder="Informe seu email"
													required
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="senha"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Senha</FormLabel>
											<FormControl>
												<Input
													type="password"
													placeholder="Informe sua senha"
													required
													autoComplete="current-password"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button type="submit" className="w-full">
									Entrar
								</Button>
							</form>
						</Form>
					</div>

					<div className="mt-4 flex flex-col items-center text-sm">
						<Link
							to="/recuperar-senha"
							className="inline-block text-sm underline"
						>
							Esqueceu sua senha?
						</Link>

						<div>
							Não possui uma conta?{" "}
							<Link to="/cadastro" className="underline">
								Cadastre-se
							</Link>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
