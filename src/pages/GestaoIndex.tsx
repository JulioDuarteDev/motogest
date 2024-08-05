import { GraficoMotosDisponiveis } from "@/components/graficos/GraficoMotosDisponiveis";
import { GraficoDistribuicaoMotosModelo } from "@/components/graficos/GraficoDistribuicaoMotosModelo";
import { GraficoDistribuicaoMotosQuilometragem } from "@/components/graficos/GraficoDistribuicaoMotosQuilometragem";
import { MotosRecentes } from "@/components/dashboard/MotosRecentes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSignIcon, ArrowBigDownDash, ArrowBigUpDash } from "lucide-react";
import { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import { toast } from "@/components/ui/use-toast.ts";


export function GestaoIndex() {
	const { rpc } = useApi();
	const [dados, setDados] = useState([]);

	async function getDadosMotos() {
		try {
			const data = await rpc("get_moto_details");
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
		getDadosMotos();
	}, []);

	const financiamentosPendentes = dados
		.flatMap((item) => item.financiamento)
		.filter((f) => !f.quitado);

	const totalPendentes = financiamentosPendentes.reduce(
		(acc, f) => acc + f.valor_parcela,
		0
	);

	return (
		<div className="container space-y-3">
			<h2>Visualização geral</h2>

			<div className="grid gap-3 md:grid-cols-3">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Financiamentos em aberto
						</CardTitle>
						<DollarSignIcon className="size-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-xl font-bold">
							{financiamentosPendentes.length}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Mensalidades de financiamento
						</CardTitle>
						<ArrowBigDownDash className="size-5 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-xl font-bold">
							{totalPendentes.toLocaleString("pt-BR", {
								style: "currency",
								currency: "BRL",
							})}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total de entradas
						</CardTitle>
						<ArrowBigUpDash className="size-5 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-xl font-bold">+2350</div>
					</CardContent>
				</Card>
			</div>
			<div className="grid gap-3 md:grid-cols-2">
				<GraficoMotosDisponiveis dados={dados} />
				<MotosRecentes dados={dados} />
			</div>
			<div className="grid gap-3 md:grid-cols-2">
				<GraficoDistribuicaoMotosModelo dados={dados} />

				<GraficoDistribuicaoMotosQuilometragem dados={dados} />
			</div>
		</div>
	);
}
