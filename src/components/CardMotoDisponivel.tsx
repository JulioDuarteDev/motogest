import FallbackImage from "@/assets/fallback_moto.jpg";
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
							<CardTitle>
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
						<DialogTitle>{modelo}</DialogTitle>
					</DialogHeader>
					<ul>
						<li>Ano: {ano}</li>
						<li>Marca: {marca}</li>
						<li>Cilindrada: {cilindrada}</li>
						<li>Cor: {cor}</li>
						<li>Quilometragem: {quilometragem}</li>
					</ul>
					<DialogFooter>
						<Button>Entrar em contato</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
