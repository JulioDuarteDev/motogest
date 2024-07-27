import { GraficoMotosDisponiveis } from "@/components/graficos/GraficoMotosDisponiveis";
import { Overview } from "@/components/graficos/Overview";
import { LocacoesRecentes } from "@/components/LocacoesRecentes";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { DollarSignIcon, ArrowBigDownDash, ArrowBigUpDash } from "lucide-react";

export function GestaoIndex() {
	return (
		<div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-3xl font-bold tracking-tight">
					Visualização geral
				</h2>
			</div>
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
			<div className="grid gap-4 md:grid-cols-3">
				<Card className="flex flex-col">
					<CardHeader className="items-center pb-0">
						<CardTitle>Motos</CardTitle>
						<CardDescription>Situação atual</CardDescription>
					</CardHeader>
					<CardContent className="flex-1 pb-0">
						<GraficoMotosDisponiveis />
					</CardContent>
				</Card>
				<Card className="flex flex-col">
					<CardHeader>
						<CardTitle>Últimas despesas</CardTitle>
						<CardDescription>26 despesas cadastradas esse mês</CardDescription>
					</CardHeader>
					<CardContent>
						<LocacoesRecentes />
					</CardContent>
				</Card>
				<Card className="flex flex-col">
					<CardHeader>
						<CardTitle>Últimas locações</CardTitle>
						<CardDescription>26 locações realizadas esse mês</CardDescription>
					</CardHeader>
					<CardContent>
						<LocacoesRecentes />
					</CardContent>
				</Card>
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
