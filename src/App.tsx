import { MotosDisponiveis } from "@/pages/moto/MotosDisponiveis";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Error404 } from "@/pages/Error404";
import { MotoCadastro } from "@/pages/moto/MotoCadastro";
import { ModeloCadastro } from "@/pages/modelo/ModeloCadastro";
import { Login } from "@/pages/autenticacao/Login";
import { GestaoIndex } from "@/pages/GestaoIndex";
import { MotoDetalhes } from "@/pages/moto/MotoDetalhes";
import { MotoListagem } from "@/pages/moto/MotoListagem";
import { ModeloListagem } from "@/pages/modelo/ModeloListagem";
import { ModeloDetalhes } from "@/pages/modelo/ModeloDetalhes";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext.tsx";
import { RedirecionamentoAuth } from "@/components/redirecionamentos/RedirecionamentoAuth";
import { RedirecionamentoRotas } from "@/components/redirecionamentos/RedirecionamentoRotas";

function App() {
	// TODO: ajustar visual header
	// TODO: ajustar visual card moto disponivel

	const router = createBrowserRouter([
		{
			path: "/",
			element: (
				<RedirecionamentoRotas
					isPrivate={false}
					Component={<MotosDisponiveis />}
				/>
			),
			errorElement: <Error404 />,
		},
		{ path: "login", element: <RedirecionamentoAuth Component={<Login />} /> },
		{
			path: "gestao",
			element: <Outlet />,
			children: [
				{
					index: true,
					element: <RedirecionamentoRotas Component={<GestaoIndex />} />,
				},
				{
					path: "moto",
					element: <Outlet />,
					children: [
						{
							index: true,
							element: <RedirecionamentoRotas Component={<MotoListagem />} />,
						},
						{
							path: "cadastro",
							element: <RedirecionamentoRotas Component={<MotoCadastro />} />,
						},
						{
							path: "edicao/:id",
							element: <RedirecionamentoRotas Component={<MotoCadastro />} />,
						},
						{
							path: ":id",
							element: <RedirecionamentoRotas Component={<MotoDetalhes />} />,
						},
					],
				},
				{
					path: "modelo",
					element: <Outlet />,
					children: [
						{
							index: true,
							element: <RedirecionamentoRotas Component={<ModeloListagem />} />,
						},
						{
							path: "cadastro",
							element: <RedirecionamentoRotas Component={<ModeloCadastro />} />,
						},
						{
							path: "edicao/:id",
							element: <RedirecionamentoRotas Component={<ModeloCadastro />} />,
						},
						{
							path: ":id",
							element: <RedirecionamentoRotas Component={<ModeloDetalhes />} />,
						},
					],
				},
			],
		},
	]);

	return (
		<AuthProvider>
			<RouterProvider router={router} />
			<Toaster />
		</AuthProvider>
	);
}

export default App;
