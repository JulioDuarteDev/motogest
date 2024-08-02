import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export function RedirecionamentoAuth({
	Component,
}: {
	Component: JSX.Element;
}) {
	const { isLoggedIn } = useContext(AuthContext);

	return isLoggedIn ? <Navigate to="/gestao" replace /> : Component;
}
