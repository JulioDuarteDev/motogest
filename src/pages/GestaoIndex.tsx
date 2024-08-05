import { GraficoMotosDisponiveis } from "@/components/graficos/GraficoMotosDisponiveis";
import { Overview } from "@/components/graficos/Overview";
import { MotosRecentes } from "@/components/dashboard/MotosRecentes";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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

	return (
		<div className="container space-y-4">
			<h2>Visualização geral</h2>

			<div className="grid gap-4 md:grid-cols-3">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Balanço total</CardTitle>
						<DollarSignIcon className="size-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">$45,231.89</div>
						<p className="text-xs text-muted-foreground">
							20.1% mais que o mês anterior
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total de despesas
						</CardTitle>
						<ArrowBigDownDash className="size-5 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">+2350</div>
						<p className="text-xs text-muted-foreground">
							180.1% mais que o mês anterior
						</p>
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
						<div className="text-2xl font-bold">+2350</div>
						<p className="text-xs text-muted-foreground">
							180.1% mais que o mês anterior
						</p>
					</CardContent>
				</Card>
			</div>
			<div className="grid gap-4 md:grid-cols-2">
				<GraficoMotosDisponiveis dados={dados} />
				<MotosRecentes dados={dados} />
			</div>
			<div className="grid gap-4 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Histórico de lucros</CardTitle>
					</CardHeader>
					<CardContent className="pl-2">
						<Overview />
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Histórico de locações</CardTitle>
					</CardHeader>
					<CardContent className="pl-2">
						<Overview />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
