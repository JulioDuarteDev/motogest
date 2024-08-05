import FallbackImage from "@/assets/img/fallback_moto.jpg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

export function CardMotoDisponivel({ moto }) {
	const textoMensagem = `Olá, gostaria de saber mais sobre a moto "${moto.nome}"`;
	const numeroTelefone = "123456789";

	return (
		<Dialog>
			<DialogTrigger>
				<Card role="listitem" className="h-[250px]">
					<CardHeader className="text-center">
						<img
							className="w-full h-40"
							alt={"Imagem de " + moto.nome}
							src={moto.variacoes[0].url || FallbackImage}
						></img>
						<CardTitle className="text-base">{moto.nome}</CardTitle>
					</CardHeader>
				</Card>
			</DialogTrigger>
			<DialogContent aria-describedby={undefined} className="max-w-[500px]">
				<DialogHeader className="container">
					{moto.variacoes.length > 1 ? (
						<Carousel className="w-full p-2">
							<CarouselContent>
								{moto.variacoes.map((cor, index) => (
									<CarouselItem key={index}>
										<Card>
											<CardContent>
												<img className="h-auto" src={cor.url} alt={cor.cor} />
											</CardContent>
										</Card>
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious />
							<CarouselNext />
						</Carousel>
					) : (
						<img
							alt={"Imagem de " + moto.modelo}
							src={moto.variacoes[0].url || FallbackImage}
						></img>
					)}
					<DialogTitle className="text-center">{moto.nome}</DialogTitle>
				</DialogHeader>
				<dl className="space-y-3">
					<div className="flex gap-2">
						<dt className="font-semibold">Marca:</dt>
						<dd>{moto.marca}</dd>
					</div>
					<div className="flex gap-2">
						<dt className="font-semibold">Cilindradas:</dt>
						<dd>{moto.cilindrada}cc</dd>
					</div>
					<div className="flex gap-2">
						<dt className="font-semibold">Quantidade disponível:</dt>
						<dd>{moto.quantidade}</dd>
					</div>
				</dl>
				<DialogFooter className="justify-center">
					<Link
						target="_blank"
						rel="noopener noreferrer"
						to={encodeURI(
							`https://api.whatsapp.com/send?phone=${numeroTelefone}&text=${textoMensagem}`
						)}
						className={buttonVariants() + " w-full flex gap-2"}
					>
						<FontAwesomeIcon size="xl" icon={faWhatsapp} className="pr-2" />{" "}
						Entrar em contato
					</Link>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
