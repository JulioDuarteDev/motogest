import { Button } from "@/components/ui/button";

export function HeaderPublico(){
	return (
		<nav className="w-full border-b-2 py-2">
			<div className="container flex items-center justify-between">
				<a href="/">
					<h1 className={"text-xl"}>MotoGest</h1>
				</a>
				<Button asChild>
					<a href="/login">Entrar</a>
				</Button>
			</div>
		</nav>
	);
}
