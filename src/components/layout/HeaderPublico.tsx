import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogoMotogest } from "@/components/icons/logo_moto";
interface HeaderProps {
	mostrarBotaoEntrar?: boolean;
}

export function HeaderPublico({ mostrarBotaoEntrar = true }: HeaderProps) {
	return (
		<header className="bg-background sticky top-0 z-40 w-full border-b">
			<div className="container flex h-16 items-center justify-between">
				<Link to="/" className="flex items-center gap-2">
					<LogoMotogest size={50} />
					<h1>MotoGest</h1>
				</Link>
				{mostrarBotaoEntrar && (
					<Link className={buttonVariants({ variant: "default" })} to="/login">
						Entrar
					</Link>
				)}
			</div>
		</header>
	);
}
