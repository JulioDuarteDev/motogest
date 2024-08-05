import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartConfig,
} from "@/components/ui/chart";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";

export function GraficoDistribuicaoMotosModelo({ dados }) {
	const chartConfig = {
		total: {
			label: "Total",
		},
	} satisfies ChartConfig;

	const data = Object.values(
		dados.reduce((acc, moto) => {
			const { nome } = moto.modelo;
			if (!acc[nome]) {
				acc[nome] = { nome: nome, total: 0 };
			}
			acc[nome].total++;
			return acc;
		}, {})
	);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Distribuição de motos</CardTitle>
				<CardDescription>Por modelo</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig} className="max-h-[240px] w-full">
					<BarChart accessibilityLayer data={data}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="nome"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
						/>
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
						<Bar dataKey="total" fill="hsl(var(--success))" radius={10}>
							<LabelList
								position="top"
								offset={12}
								className="fill-foreground font-semibold"
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
