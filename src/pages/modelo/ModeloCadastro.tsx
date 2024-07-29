// TODO: ajustar mensagens de validação do ZOD em todos os inputs
// TODO: adicionar tooltip aos campos de url de imagem

import { PlusIcon, Trash2Icon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { toast } from "@/components/ui/use-toast";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import Marca from "@/interfaces/Marca";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
	_nome: z.string().min(2, {
		message: "Informe um modelo válido",
	}),
	_marca: z.string({
		required_error: "É necessário selecionar uma marca",
	}),
	_cilindrada: z.coerce
		.number({ message: "Informe um número válido" })
		.int("Deve ser um número inteiro")
		.positive("Deve ser um número positivo"),
	_cores: z
		.array(
			z.object({
				nome: z.string().min(3, "Informe uma cor válida"),
				url: z
					.string()
					.url("Informe uma URL válida")
					.optional()
					.or(z.literal("")),
			})
		)
		.min(1, "Ao menos uma cor deve ser informada"),
});

export function ModeloCadastro() {
	const navigate = useNavigate();
	const { list, rpc } = useApi();
	const [marcas, setMarcas] = useState<Marca[]>([]);

	async function getMarcas() {
		try {
			const data = await list("marcas");
			setMarcas(data as Marca[]);
		} catch (error) {
			toast({
				title: "Ops!",
				description: error.message,
				variant: "destructive",
			});
		}
	}

	async function postModelo(form: object) {
		try {
			await rpc("modelo_chain_insert", form);

			toast({
				title: "Sucesso!",
				description: `Modelo "${form._nome}" cadastrado com sucesso!`,
				variant: "success",
			});
		} catch (error) {
			toast({
				title: "Ops!",
				description: error.message,
				variant: "destructive",
			});
		} finally {
			navigate("/modelo");
		}
	}

	useEffect(() => {
		getMarcas();
	}, []);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			_nome: "",
			_cores: [{ nome: "", url: "" }],
			_cilindrada: "",
		},
	});

	const {
		control,
		formState: { errors },
	} = form;

	const { append, remove, fields } = useFieldArray({
		control,
		name: "_cores",
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		isCadastro ? postModelo(values) : console.log(values);
	}

	const isCadastro = true;
	return (
		<div className="container space-y-4">
			<h2 className="text-3xl font-bold tracking-tight">
				{isCadastro ? "Cadastro" : "Edição"} de modelo de moto
			</h2>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
					<fieldset className="grid gap-4 rounded-lg border p-4">
						<legend className="-ml-1 px-1 text-sm font-medium">
							Informações gerais
						</legend>
						<FormField
							control={form.control}
							name="_marca"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Marca</FormLabel>
									<Select onValueChange={field.onChange} value={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Selecione uma marca" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{marcas.map((item) => {
												return (
													<SelectItem key={item.id} value={item.nome}>
														{item.nome}
													</SelectItem>
												);
											})}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="_nome"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Modelo</FormLabel>
									<FormControl>
										<Input placeholder="Informe o modelo" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="_cilindrada"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Cilindradas</FormLabel>
									<FormControl>
										<Input
											placeholder="Informe a quantidade de cilindradas"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</fieldset>

					<fieldset className="grid gap-4 grid-cols-1 rounded-lg border p-4">
						<legend className="-ml-1 px-1 text-sm font-medium">
							Cores disponíveis
						</legend>

						{fields?.map((field, index) => (
							<div key={field.id} className="flex flex-col sm:flex-row gap-4">
								<FormField
									control={form.control}
									name={`_cores.${index}.nome`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Cor {index + 1}</FormLabel>
											<FormControl>
												<Input placeholder="Informe o nome da cor" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`_cores.${index}.url`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>URL da imagem {index + 1}</FormLabel>
											<FormControl>
												<Input
													placeholder="Insira o link para uma imagem da moto"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{fields.length > 1 && (
									<Button
										variant="outline"
										size="icon"
										type="button"
										onClick={() => remove(index)}
										className="sm:mt-8 w-full sm:w-10"
									>
										<Trash2Icon className="size-4 " />
									</Button>
								)}
							</div>
						))}

						<Button
							type="button"
							variant="secondary"
							className="flex items-center gap-2 w-fit self-center"
							onClick={() =>
								append({
									nome: "",
									url: "",
								})
							}
						>
							<PlusIcon className="size-4" />
							Adicionar nova cor
						</Button>
					</fieldset>

					<Button type="submit">{isCadastro ? "Cadastrar" : "Editar"}</Button>
				</form>
			</Form>
		</div>
	);
}
