import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import { SquarePen, Trash2Icon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import useApi from "@/hooks/useApi";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export function ModeloDetalhes() {
	const [dados, setDados] = useState({});
	const { id } = useParams();
	const { rpc } = useApi();

	function formataData(data: string) {
		const date = new Date(data);

		const opcoes = {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
		};

		return date.toLocaleDateString("pt-BR", opcoes);
	}

	async function getDadosIniciais() {
		try {
			const data = await rpc("modelo_chain_get_with_motos", { modelo_id: id });
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
								{dados.marca} {dados.nome}
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
								to={`/gestao/modelo/edicao/${id}`}
							>
								<SquarePen className="size-4" />
								Editar
							</Link>
							<Button size="sm" variant="secondary" className="flex gap-2">
								<Trash2Icon className="size-4 " />
								Excluir
							</Button>
						</div>
					</div>
				</div>
				<main className="px-4 py-8">
					<div className="flex justify-between gap-4 flex-wrap">
						<div>
							<h2 className="text-xl font-bold mb-4">Especificações</h2>
							<dl className="grid grid-cols-2 gap-8">
								<div>
									<dt className="text-muted-foreground">Marca</dt>
									<dd>{dados.marca}</dd>
								</div>
								<div>
									<dt className="text-muted-foreground">Modelo</dt>
									<dd>{dados.nome}</dd>
								</div>
								<div>
									<dt className="text-muted-foreground">Cilindradas</dt>
									<dd>{dados.cilindrada}cc</dd>
								</div>
								<div>
									<dt className="text-muted-foreground">Quantidade de motos</dt>
									<dd>{dados.motos?.length}</dd>
								</div>
								<div>
									<dt className="text-muted-foreground">Cores disponíveis</dt>
									{dados.cores?.map((cor, index) => {
										return (
											<dd key={index} className="ml-5 list-item list-disc">
												{cor.cor}
											</dd>
										);
									})}
								</div>
							</dl>
						</div>
						<div>
							<h2 className="text-xl font-bold mb-4">Galeria</h2>
							<div className="container">
								<Carousel className="rounded-lg w-full max-w-lg">
									<CarouselContent>
										{dados.cores?.map((cor, index) => {
											return (
												<CarouselItem key={index}>
													<Card>
														<CardContent>
															<img
																className="rounded-lg object-cover aspect-video"
																src={cor.url}
																alt={cor.cor}
															/>
														</CardContent>
													</Card>
													<p className="text-center mt-2 ">{cor.cor}</p>
												</CarouselItem>
											);
										})}
									</CarouselContent>
									<CarouselPrevious />
									<CarouselNext />
								</Carousel>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
