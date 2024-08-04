import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { HeaderPublico } from "@/components/layout/HeaderPublico";

export function RedirecionamentoAuth({
	Component,
}: {
	Component: JSX.Element;
}) {
	const { isLoggedIn } = useContext(AuthContext);

	return isLoggedIn ? (
		<Navigate to="/gestao" replace />
	) : (
		<div className="flex min-h-screen flex-col space-y-5">
			<HeaderPublico mostrarBotaoEntrar={false} />
			<main className="flex flex-1">{Component}</main>
		</div>
	);
}
