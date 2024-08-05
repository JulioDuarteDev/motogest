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

	return {
		getVarianteBadge,
	};
}
