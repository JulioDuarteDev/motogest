import { CardMotoDisponivel } from "@/components/CardMotoDisponivel";
import { Separator } from "@/components/ui/separator";


const imageMap = {
	"NXR160 BROS ESDD": {
		preta:
			"https://www.honda.com.br/motos/sites/hda/files/2024-05/imagem-home-moto-honda-nxr-160-bros-esdd-azul-2024.webp",
		vermelha:
			"https://www.honda.com.br/motos/sites/hda/files/2024-05/imagem-home-moto-honda-nxr-160-bros-esdd-vermelho-2024.webp",
		branca:
			"https://www.honda.com.br/motos/sites/hda/files/2024-05/imagem-home-moto-honda-nxr-160-bros-esdd-branco-2024.webp",
	},
};

function getImageUrl(modelo: string, cor: string) {
  return imageMap[modelo]?.[cor];
}

export function MotosDisponiveis() {
	const motos = [
		{
			modelo: "NXR160 BROS ESDD",
			ano: 2024,
			marca: "Honda",
			cor: "preta",
			quilometragem: 0,
			cilindrada: 160,
		},
		{
			modelo: "NXR160 BROS ESDD",
			ano: 2024,
			marca: "Honda",
			cor: "branca",
			quilometragem: 0,
			cilindrada: 160,
		},
		{
			modelo: "NXR160 BROS ESDD",
			ano: 2024,
			marca: "Honda",
			cor: "vermelha",
			quilometragem: 0,
			cilindrada: 160,
		},
		{
			modelo: "CB 500F",
			ano: 2023,
			marca: "Honda",
			quilometragem: 30,
			cilindrada: 160,
			cor: "preta",
		},
		{
			modelo: "CBR 1000RR",
			ano: 2022,
			marca: "Honda",
			quilometragem: 2340,
			cilindrada: 160,
			cor: "preta",
		},
		{
			modelo: "CRF 1100L",
			ano: 2021,
			marca: "Honda",
			quilometragem: 534,
			cilindrada: 160,
			cor: "preta",
		},
	];

	return (
		<>
			<header className="flex flex-col center gap-1">
				<h2 className="h2">Motos disponíveis</h2>
				<p>Exibindo {motos.length} motos disponíveis</p>
			</header>

			<Separator />

			<div className="flex gap-5 flex-wrap center">
				{motos.map((moto, index) => (
					<CardMotoDisponivel
						key={index}
						modelo={moto.modelo}
						ano={moto.ano}
						url_imagem={getImageUrl(moto.modelo, moto.cor)}
						cor={moto.cor}
						marca={moto.marca}
						quilometragem={moto.quilometragem}
						cilindrada={moto.cilindrada}
					/>
				))}
			</div>
			<ul></ul>
		</>
	);
}
