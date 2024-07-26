import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { GraficoMotosDisponiveis } from "@/components/graficos/GraficoMotosDisponiveis";
import { Overview } from "@/components/graficos/Overview";
import { RecentSales } from "@/components/recent-sales";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { CreditCard, DollarSignIcon, Users } from "lucide-react";

export function GestaoIndex() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Visualização geral
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita total</CardTitle>
            <DollarSignIcon className="size-4 text-muted-foreground"/>
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
              Novos clientes
            </CardTitle>
            <Users className="size-4 text-muted-foreground"/>
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
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard className="size-4 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            <CreditCard className="size-4 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Motos</CardTitle>
        <CardDescription>Situação atual</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <GraficoMotosDisponiveis />
      </CardContent>
    </Card>

        <Card className="col-span-4 md:col-span-3">
          <CardHeader>
            <CardTitle>Últimas locações</CardTitle>
            <CardDescription>26 locações realizadas esse mês</CardDescription>
          </CardHeader>
          {/* <CardContent>
                    <RecentSales />
                  </CardContent> */}
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Histórico de lucros</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
