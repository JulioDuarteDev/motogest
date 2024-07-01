import { Link } from "react-router-dom";

export function HeaderPrivado(){
	return (
		<nav className="w-full border-b-2 p-2">
				<Link to={"/"}>
					<h1 className={"text-xl"}>MotoGest</h1>
				</Link>
		</nav>
	);
}
