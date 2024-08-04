import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function EmConstrucao() {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col grow items-center justify-center p-4 gap-6">
			<h1>Em construção</h1>
			<p className="text-md text-primary">
				A página que você está tentando acessar ainda não foi concluída.
			</p>
			<Button role="link" onClick={() => navigate(-1)}>Voltar</Button>
		</div>
	);
}
