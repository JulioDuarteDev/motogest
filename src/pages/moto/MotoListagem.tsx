import { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import { toast } from "@/components/ui/use-toast.ts";
import { TabelaListagemMotos } from "@/components/tabelas/TabelaListagemMotos";
import { MotosProps } from "@/interfaces/MotosProps";
import Modelo from "@/interfaces/Modelo";
import Variacao from "@/interfaces/Variacao";
import Moto from "@/interfaces/Moto";
import Disponibilidade from "@/interfaces/Disponibilidade";

export function MotoListagem() {
	const { rpc } = useApi();
	const [dados, setDados] = useState<MotosProps[]>([]);
	
	async function getDadosMotos() {
		try {
			const data = await rpc("get_data_list_motos");
			const { motos, modelos, disponibilidade, variacoes_modelos } = data;
			if (motos) {
				const dadosTabela = motos.map((moto: Moto) => {
					const modelo = modelos.find((m: Modelo) => m.id === moto.modelo);
					const cor = variacoes_modelos.find(
						(c: Variacao) => c.id == moto.variacao
					);
					const disp = disponibilidade.find(
						(d: Disponibilidade) => d.id === moto.disponibilidade
					);
					return {
						id: moto.id,
						disponibilidade: disp ? disp.nome : "Desconhecido",
						placa: moto.placa,
						marca: modelo ? modelo.marca : "Desconhecida",
						modelo: modelo ? modelo.nome : "Desconhecido",
						cor: cor ? cor.cor : "Desconhecida",
						ano: moto.ano,
					};
				});
				setDados(dadosTabela);
			}
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
		<div className="container">
			<h2>Motos</h2>
			<TabelaListagemMotos data={dados} />
		</div>
	);
}
