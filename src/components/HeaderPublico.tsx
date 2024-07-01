import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeaderPublico(){
	return (
		<nav className="w-full border-b-2 py-2">
			<div className="container flex items-center justify-between">
				<Link to="/">
					<h1 className={"text-xl"}>MotoGest</h1>
				</Link>
				<Button asChild>
					<Link to="/login">Entrar</Link>
				</Button>
			</div>
		</nav>
	);
}
