import { Label, Pie, PieChart } from "recharts";

import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "../ui/card";

export function GraficoMotosDisponiveis({ dados }) {
	const chartConfig = {
		"Em manutenção": {
			label: "Em manutenção",
		},
		Disponível: {
			label: "Disponíveis",
		},
		Locada: {
			label: "Locadas",
		},
	} satisfies ChartConfig;

	const cores = {
		Locada: "#0ea5e9",
		Disponível: "hsl(var(--success))",
		"Em manutenção": "hsl(var(--destructive))",
	};

	const dadosTratados = Object.values(
		dados.reduce((acc, moto) => {
			const { nome } = moto.disponibilidade;
			if (!acc[nome]) {
				acc[nome] = { status: nome, quantidade: 0, fill: cores[nome] };
			}
			acc[nome].quantidade++;
			return acc;
		}, {})
	);

	const totalQuantidade = dadosTratados.reduce(
		(acc, item) => acc + item.quantidade,
		0
	);

	return (
		<Card>
			<CardHeader className="items-center pb-0">
				<CardTitle>Disponibilidade de motos</CardTitle>
				<CardDescription>Distribuição atual</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[280px] min-h-[150px]"
				>
					<PieChart>
						<ChartTooltip content={<ChartTooltipContent />} />
						<Pie
							data={dadosTratados}
							dataKey="quantidade"
							nameKey="status"
							innerRadius={60}
							strokeWidth={2}
						>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
												dominantBaseline="middle"
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="fill-foreground text-3xl font-bold"
												>
													{totalQuantidade}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className="fill-muted-foreground"
												>
													Total de motos
												</tspan>
											</text>
										);
									}
								}}
							/>
						</Pie>
						<ChartLegend content={<ChartLegendContent />} />
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
