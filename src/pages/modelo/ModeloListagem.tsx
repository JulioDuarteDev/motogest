import { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import { toast } from "@/components/ui/use-toast.ts";
import { TabelaListagemModelos } from "@/components/tabelas/TabelaListagemModelos";
import { ModelosProps } from "@/interfaces/ModelosProps";

export function ModeloListagem() {
	const { rpc } = useApi();
	const [dados, setDados] = useState<ModelosProps[]>([]);

	async function getDadosModelos() {
		try {
			const data = await rpc("get_data_list_modelos");
			const { modelos } = data;
			
			if (modelos) {
				setDados(modelos);
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
		getDadosModelos();
	}, []);

	return (
		<div className="container">
			<h2>Modelos</h2>
			<TabelaListagemModelos data={dados} />
		</div>
	);
}
