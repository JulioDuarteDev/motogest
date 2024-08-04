import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

export function EmConstrucao() {
	return (
		<div className="flex flex-col grow items-center justify-center p-4 gap-6">
			<h1>Em construção</h1>
			<p className="text-md text-primary">
				A página que você está tentando acessar ainda não foi concluída.
			</p>
			<Link className={buttonVariants({ variant: "default" })} to="/">
				Voltar para o início
			</Link>
		</div>
	);
}
