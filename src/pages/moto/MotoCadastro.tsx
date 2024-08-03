// TODO: adicionar mascaras para valor

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
	FormDescription,
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
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import Marca from "@/interfaces/Marca";
import { useNavigate, useParams } from "react-router-dom";
import Modelo from "@/interfaces/Modelo";
import Variacao from "@/interfaces/Variacao";
import Disponibilidade from "@/interfaces/Disponibilidade";
import formSchema from "@/components/forms/cadastro_moto/formSchema";

const situacoes = [
	{ nome: "Quitada", id: "1", value: true },
	{ nome: "Financiamento em andamento", id: "2", value: false },
];

export function MotoCadastro() {
	const navigate = useNavigate();
	const { rpc } = useApi();
	const [marcas, setMarcas] = useState<Marca[]>([]);
	const [todosModelos, setTodosModelos] = useState<Modelo[]>([]);
	const [modelos, setModelos] = useState<Modelo[]>([]);
	const [todasCores, setTodasCores] = useState<Variacao[]>([]);
	const [cores, setCores] = useState<Variacao[]>([]);
	const [disponibilidade, setDisponibilidade] = useState<Disponibilidade[]>([]);
	const [showFinanciamento, setShowFinanciamento] = useState(false);

	const { id } = useParams();
	const isEdicao = !!id;

	async function getDadosIniciais() {
		try {
			const data = await rpc("get_data_form_moto");
			const { marcas, modelos, disponibilidade, variacoes_modelos } = data;

			setMarcas(marcas as Marca[]);
			setTodosModelos(modelos as Modelo[]);
			setTodasCores(variacoes_modelos as Variacao[]);
			setDisponibilidade(disponibilidade as Disponibilidade[]);

			if (isEdicao) {
				setModelos(modelos);
				setCores(variacoes_modelos);

				const moto = await rpc("moto_chain_get", { moto_id: id });
				const { modelo, financiamento, ...resto } = moto;

				// Adequa o objeto para o formulário
				modelo["modelo"] = modelo["id"];
				delete modelo["id"];

				form.reset({ ...modelo, ...financiamento, ...resto });
			}
		} catch (error) {
			toast({
				title: "Ops!",
				description: error.message,
				variant: "destructive",
			});
		}
	}
	function handleChangeModelo(value: Modelo["id"]) {
		const coresFiltradas = todasCores.filter((cor) => cor.modelo === value);
		setCores(coresFiltradas);
	}

	function handleChangeMarca(value: Marca["nome"]) {
		const modelosFiltrados = todosModelos.filter(
			(modelo) => modelo.marca === value
		);
		setModelos(modelosFiltrados);
	}

	async function postMoto(form) {
		try {
			await rpc("moto_chain_insert", form);
			toast({
				title: "Sucesso!",
				description: `Moto de placa "${form._placa}" cadastrada com sucesso!`,
				variant: "success",
			});

			navigate("/gestao/moto");
		} catch (error) {
			toast({
				title: "Ops!",
				description: error.message,
				variant: "destructive",
			});
		}
	}

	async function updateMoto(form) {
		try {
			form._moto_id = id;
			await rpc("moto_chain_update", form);
			toast({
				title: "Sucesso!",
				description: `Moto de placa "${form.placa}" atualizada com sucesso!`,
				variant: "success",
			});

			navigate("/gestao/moto");
		} catch (error) {
			toast({
				title: "Ops!",
				description: error.message,
				variant: "destructive",
			});
		}
	}

	useEffect(() => {
		getDadosIniciais();
	}, []);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			placa: "",
			ano: "",
			quilometragem: "",
			valor: "",
			valor_parcela: "",
			dia_vencimento: "",
			parcelas_restantes: "",
			observacoes: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		const valuesTratados = Object.fromEntries(
			Object.entries(values).map(([key, value]) => [`_${key}`, value])
		);
		isEdicao ? updateMoto(valuesTratados) : postMoto(valuesTratados);
	}

	return (
		<div className="container space-y-4">
			<h2>{isEdicao ? "Edição" : "Cadastro"} de moto</h2>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
					<fieldset className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 rounded-lg border p-4">
						<legend className="-ml-1 px-1 text-sm font-medium">
							Informações gerais
						</legend>
						<FormField
							control={form.control}
							name="marca"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Marca</FormLabel>
									<Select
										onValueChange={(value) => {
											field.onChange(value);
											handleChangeMarca(value);
										}}
										defaultValue={field.value}
										value={field.value}
									>
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
							name="modelo"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Modelo</FormLabel>
									<Select
										onValueChange={(value) => {
											field.onChange(value);
											handleChangeModelo(value);
										}}
										defaultValue={field.value}
										value={field.value}
										disabled={modelos.length === 0}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Selecione um modelo" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{modelos.map((item) => {
												return (
													<SelectItem key={item.id} value={item.id}>
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
							name="variacao"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Cor</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										value={field.value}
										disabled={modelos.length === 0 || cores.length === 0}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Selecione uma cor" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{cores.map((item) => {
												return (
													<SelectItem key={item.id} value={item.id}>
														{item.cor}
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
							name="placa"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Placa</FormLabel>
									<FormControl>
										<Input placeholder="Informe a placa." {...field} />
									</FormControl>
									<FormDescription>Ex: AAA1234</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="ano"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ano</FormLabel>
									<FormControl>
										<Input placeholder="Informe o ano" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="quilometragem"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Quilometragem</FormLabel>
									<FormControl>
										<Input
											placeholder="Informe a quilometragem atual"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="disponibilidade"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Disponibilidade</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										value={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Selecione a disponibilidade" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{disponibilidade.map((item) => {
												return (
													<SelectItem key={item.id} value={item.id}>
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
							name="observacoes"
							render={({ field }) => (
								<FormItem className="md:col-span-2 lg:col-span-3">
									<FormLabel>Observações</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Informe aqui qualquer observação extra sobre a moto"
											className="resize-none"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</fieldset>

					<fieldset className="grid gap-4 md:grid-cols-2 rounded-lg border p-4">
						<legend className="-ml-1 px-1 text-sm font-medium">
							Informações financeiras
						</legend>
						<FormField
							control={form.control}
							name="quitado"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Situação financeira</FormLabel>
									<Select
										onValueChange={(value) => {
											field.onChange(value);
											setShowFinanciamento(value === "false");
										}}
										defaultValue={field.value}
										value={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Selecione a situação financeira" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{situacoes.map((item) => {
												return (
													<SelectItem
														key={item.id}
														value={item.value.toString()}
													>
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
							name="valor"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Valor nominal</FormLabel>
									<FormControl>
										<Input placeholder="Informe o valor nominal" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{showFinanciamento && (
							<>
								<FormField
									control={form.control}
									name="parcelas_restantes"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Parcelas restantes</FormLabel>
											<FormControl>
												<Input
													placeholder="Informe quantas parcelas ainda restam"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="valor_parcela"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Valor das parcelas</FormLabel>
											<FormControl>
												<Input
													placeholder="Informe o valor das parcelas"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="dia_vencimento"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Dia de vencimento</FormLabel>
											<FormControl>
												<Input
													placeholder="Informe o dia de vencimento das parcelas"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						)}
					</fieldset>
					<Button type="submit">{isEdicao ? "Editar" : "Cadastrar"}</Button>
				</form>
			</Form>
		</div>
	);
}
