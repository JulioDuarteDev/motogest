import FallbackImage from "@/assets/img/fallback_moto.jpg";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

interface CardMotoDisponivelProps {
	ano: number;
	cor?: string;
	cilindrada: number;
	quilometragem: number;
	marca: string;
	modelo: string;
	url_imagem?: string;
}

export function CardMotoDisponivel({
	modelo,
	ano,
	cor,
	marca,
	quilometragem,
	url_imagem,
	cilindrada
}: CardMotoDisponivelProps) {
	return (
		<div>
			<Dialog>
				<DialogTrigger>
					<Card role={"listitem"} className="w-[300px]">
						<CardHeader className="text-center">
							<img
								alt={"Imagem de " + modelo}
								src={url_imagem || FallbackImage}
							></img>
							<CardTitle className="text-base">
								{modelo} ({ano})
							</CardTitle>
						</CardHeader>
					</Card>
				</DialogTrigger>
				<DialogContent
					aria-describedby={undefined}
					className="sm:max-w-[425px]"
				>
					<DialogHeader>
						<img
							alt={"Imagem de " + modelo}
							src={url_imagem || FallbackImage}
						></img>
						<DialogTitle className="text-center">{modelo}</DialogTitle>
					</DialogHeader>
					<ul>
						<li><span className="font-bold">Ano: </span>{ano}</li>
						<li><span className="font-bold">Marca:  </span>{marca}</li>
						<li><span className="font-bold">Cilindrada: </span>{cilindrada}</li>
						<li><span className="font-bold">Cor: </span>{cor}</li>
						<li><span className="font-bold">Quilometragem: </span>{quilometragem}</li>
					</ul>
					<DialogFooter className="sm:justify-center">
						<Button className="w-full"> <FontAwesomeIcon size="xl" icon={faWhatsapp} className="pr-2"/> Entrar em contato</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
