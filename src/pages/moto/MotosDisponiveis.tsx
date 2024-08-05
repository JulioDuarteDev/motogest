import { CardMotoDisponivel } from "@/components/CardMotoDisponivel";
import { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import { toast } from "@/components/ui/use-toast.ts";

export function MotosDisponiveis() {
	const { rpc } = useApi();
	const [dados, setDados] = useState([]);

	async function getDadosMotos() {
		try {
			const data = await rpc("get_moto_details");

			const agrupadosPorModelo = data.reduce((acc, moto) => {
				const { modelo, disponibilidade } = moto;
				if (disponibilidade.nome === "Disponível") {
					if (!acc[modelo.nome]) {
						acc[modelo.nome] = { ...modelo, quantidade: 0 };
					}
					acc[modelo.nome].quantidade++;
				}
				return acc;
			}, {});

			const motosDisponiveisArray = Object.values(agrupadosPorModelo);
			setDados(motosDisponiveisArray);
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
			<section className="flex flex-col gap-1 ">
				<h2>Modelos disponíveis</h2>
				<p className="text-muted-foreground">
					Exibindo {dados.length} modelos de motos disponíveis
				</p>
			</section>

			<ul className="grid sm:grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-3">
				{dados.map((moto, index) => (
					<CardMotoDisponivel key={index} moto={moto} />
				))}
			</ul>
		</div>
	);
}
