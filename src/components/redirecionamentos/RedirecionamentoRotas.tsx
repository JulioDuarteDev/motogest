import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { HeaderPrivado } from "@/components/layout/HeaderPrivado";
import { HeaderPublico } from "@/components/layout/HeaderPublico";

interface RedirecionamentoRotasProps {
	Component: JSX.Element;
	isPrivate?: boolean;
}

export function RedirecionamentoRotas({
	Component,
	isPrivate = true,
}: RedirecionamentoRotasProps) {
	const { isLoggedIn } = useContext(AuthContext);

	if (isPrivate && !isLoggedIn) {
		return <Navigate to="/login" replace />;
	}

	return (
		<div className="flex flex-col space-y-5">
			{isLoggedIn ? <HeaderPrivado /> : <HeaderPublico/>}
			{Component}
		</div>
	);
}
