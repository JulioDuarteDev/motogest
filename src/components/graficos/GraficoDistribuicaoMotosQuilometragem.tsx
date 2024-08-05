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

export function GraficoDistribuicaoMotosQuilometragem({ dados }) {
	const chartConfig = {
		quilometragem: {
			label: "Quilometragem",
		},
	} satisfies ChartConfig;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Distribuição de motos</CardTitle>
				<CardDescription>Por quilometragem</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig} className="max-h-[240px] w-full">
					<BarChart accessibilityLayer data={dados}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="placa"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
						/>
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
						<Bar dataKey="quilometragem" fill="hsl(var(--success))" radius={10}>
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
