import { MotosProps } from "@/interfaces/MotosProps";

export default function utils() {
	function getVarianteBadge(disponibilidade: MotosProps["disponibilidade"]) {
		switch (disponibilidade) {
			case "Disponível":
				return "success";
			case "Em manutenção":
				return "destructive";
			case "Locada":
				return "neutral";
			default:
				return undefined;
		}
	}

	function formataValor(numero: number) {
		return numero?.toLocaleString("pt-BR", {
			style: "currency",
			currency: "BRL",
		});
	}
	function formataData(data: string) {
		const date = new Date(data);

		return date.toLocaleDateString("pt-BR", {
			hour: "2-digit",
			minute: "2-digit",
		});
  }
  
	return {
		getVarianteBadge,
		formataValor,
		formataData,
	};
}
