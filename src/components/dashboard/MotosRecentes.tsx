import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "../ui/card";

export function MotosRecentes({ dados }) {
	const agora = new Date();
	const mesAtual = agora.getMonth();
	const anoAtual = agora.getFullYear();

	const countThisMonth = dados.filter(({ created_at }) => {
		const createdAt = new Date(created_at);
		return (
			createdAt.getMonth() === mesAtual && createdAt.getFullYear() === anoAtual
		);
	}).length;

	return (
		<Card className="flex flex-col">
			<CardHeader>
				<CardTitle>Últimas motos</CardTitle>
				<CardDescription>
					{countThisMonth} motos cadastradas esse mês
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				{dados
					.slice(-5)
					.reverse()
					.map((item, index) => (
						<div key={index} className="flex justify-between gap-4">
							<div className="space-y-1">
								<p className="text-sm font-medium leading-none">
									{item.modelo.marca} {item.modelo.nome}
								</p>
								<p className="text-sm text-muted-foreground">{item.placa}</p>
							</div>
							<div className="font-medium">
								{item.financiamento.valor.toLocaleString("pt-BR", {
									style: "currency",
									currency: "BRL",
								})}
							</div>
						</div>
					))}
			</CardContent>
		</Card>
	);
}
