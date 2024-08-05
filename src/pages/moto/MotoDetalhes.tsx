import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import { SquarePen, Trash2Icon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useApi from "@/hooks/useApi";

export function MotoDetalhes() {
	const [dados, setDados] = useState({});
	const [openAlert, setOpenAlert] = useState(false);
	const { id } = useParams();
	const { rpc } = useApi();
	const navigate = useNavigate();
	const { deleteById } = useApi();

	function formataData(data: string) {
		const date = new Date(data);

		return date.toLocaleDateString("pt-BR", {
			hour: "2-digit",
			minute: "2-digit",
		});
	}

	async function handleExcluirMoto() {
		try {
			await deleteById("motos", id);
			navigate("/gestao/moto");
			toast({
				title: "Sucesso!",
				description: `Moto de placa "${dados.placa}" excluída com sucesso!`,
				variant: "success",
			});
		} catch (error) {
			toast({
				title: "Ops!",
				description: error.message,
				variant: "destructive",
			});
		}
	}

	async function getDadosIniciais() {
		try {
			const data = await rpc("get_moto_details_by_id", { moto_id: id });
			setDados(data);
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

	return (
		<div className="container">
			<div className="flex gap-4 flex-col">
				<div className="px-4 py-8">
					<div className="flex justify-between gap-2 flex-wrap">
						<div>
							<h2>
								{dados.modelo?.nome} -{" "}
								<span className="uppercase">{dados.placa}</span>
							</h2>
							<p className="text-muted-foreground">
								Criado em {formataData(dados.created_at)}
							</p>
						</div>
						<div className="flex gap-3">
							<Link
								className={
									buttonVariants({ variant: "secondary", size: "sm" }) +
									" flex gap-2"
								}
								to={`/gestao/moto/edicao/${id}`}
							>
								<SquarePen className="size-4" />
								Editar
							</Link>
							<Button
								size="sm"
								variant="secondary"
								className="flex gap-2"
								onClick={() => {
									setOpenAlert(true);
								}}
							>
								<Trash2Icon className="size-4 " />
								Excluir
							</Button>
						</div>
					</div>
				</div>
				<main className="px-4 py-8 flex gap-4 justify-between flex-wrap">
					<div className="flex flex-col gap-8 flex-wrap">
						<div>
							<h2 className="text-xl font-bold mb-4">Especificações</h2>
							<dl className="grid grid-cols-2 sm:grid-cols-3 gap-5">
								<div>
									<dt className="text-muted-foreground">Marca</dt>
									<dd>{dados.modelo?.marca}</dd>
								</div>
								<div>
									<dt className="text-muted-foreground">Modelo</dt>
									<dd>{dados.modelo?.nome}</dd>
								</div>
								<div>
									<dt className="text-muted-foreground">Cilindradas</dt>
									<dd>{dados.modelo?.cilindrada}cc</dd>
								</div>
								<div>
									<dt className="text-muted-foreground">Ano</dt>
									<dd>{dados.ano}</dd>
								</div>
								<div>
									<dt className="text-muted-foreground">Placa</dt>
									<dd className="uppercase">{dados.placa}</dd>
								</div>
								<div>
									<dt className="text-muted-foreground">Cor</dt>
									<dd>{dados.variacao?.cor}</dd>
								</div>
								<div>
									<dt className="text-muted-foreground">Quilometragem</dt>
									<dd>{dados.quilometragem?.toLocaleString("pt-BR")} km</dd>
								</div>
							</dl>
						</div>
						<div>
							<h2 className="text-xl font-bold mb-4">Financiamento</h2>
							<dl className="grid grid-cols-2 sm:grid-cols-3 gap-5">
								<div>
									<dt className="text-muted-foreground">Valor</dt>
									<dd>
										{dados.financiamento?.valor?.toLocaleString("pt-BR", {
											style: "currency",
											currency: "BRL",
										})}
									</dd>
								</div>
								<div>
									<dt className="text-muted-foreground">Status</dt>
									<dd>
										{dados.financiamento?.quitado ? "Quitado" : "Em andamento"}
									</dd>
								</div>
								{!dados.financiamento?.quitado && (
									<>
										<div>
											<dt className="text-muted-foreground">
												Valor da parcela
											</dt>
											<dd>
												{dados.financiamento?.valor_parcela?.toLocaleString(
													"pt-BR",
													{
														style: "currency",
														currency: "BRL",
													}
												)}
											</dd>
										</div>
										<div>
											<dt className="text-muted-foreground">
												Parcelas restantes
											</dt>
											<dd>{dados.financiamento?.parcelas_restantes}</dd>
										</div>
										<div>
											<dt className="text-muted-foreground">
												Dia de vencimento
											</dt>
											<dd>{dados.financiamento?.dia_vencimento}</dd>
										</div>
									</>
								)}
							</dl>
						</div>
					</div>

					<img
						className="max-w-xl"
						alt={`Imagem da moto {dados.modelo?.nome} - {dados.placa}`}
						src={dados?.variacao?.url}
					></img>
				</main>
			</div>
			<AlertDialog open={openAlert}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
						<AlertDialogDescription>
							Essa ação não pode ser revertida. Isso irá deletar permanentemente
							a moto de placa <strong>{dados.placa}</strong> e suas informações
							associadas de nossos servidores.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setOpenAlert(false)}>
							Cancelar
						</AlertDialogCancel>
						<AlertDialogAction
							className={buttonVariants({ variant: "destructive" })}
							onClick={() => handleExcluirMoto()}
						>
							Excluir
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
