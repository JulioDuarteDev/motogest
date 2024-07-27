
import { Label, Pie, PieChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { status: "Locadas", quantidade: 275, fill: "#0ea5e9" },
  { status: "Disponíveis", quantidade: 203, fill: "hsl(var(--warning))" },
  { status: "Em manutenção", quantidade: 287, fill: "hsl(var(--destructive))" },
]

const totalQuantidade = chartData.reduce((acc, item) => acc + item.quantidade, 0);

const chartConfig = {
  "Em manutenção": {
    label: "Em manutenção",
    color: "hsl(var(--destructive))",
  },
  Disponíveis: {
    label: "Disponíveis",
    color: "hsl(var(--warning))",
  },
  Locadas: {
    label: "Locadas",
    color: "hsl(var(--success))",
  },
} satisfies ChartConfig

export function GraficoMotosDisponiveis() {

  return (
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="quantidade"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
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
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
  )
}
