import { HeaderPublico } from "@/components/HeaderPublico";
import { MotosDisponiveis } from "@/pages/moto/MotosDisponiveis";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Error404 } from "./pages/Error404";
import { MotoCadastro } from "./pages/moto/MotoCadastro";
import { ModeloCadastro } from "./pages/modelo/ModeloCadastro";
import { HeaderPrivado } from "./components/HeaderPrivado";
import { Login } from "./pages/autenticacao/Login";
import { GestaoIndex } from "./pages/GestaoIndex";
import { MotoDetalhes } from "./pages/moto/MotoDetalhes";
import { MotoListagem } from "./pages/moto/MotoListagem";
import { ModeloListagem } from "./pages/modelo/ModeloListagem";
import { ModeloDetalhes } from "./pages/modelo/ModeloDetalhes";
import { Toaster } from "@/components/ui/toaster"
function App() {

  // TODO: ajustar visual header
  // TODO: ajustar visual card moto disponivel
  // TODO: criar layouts para renderizar condicionalmente header conforme autenticação

  const router = createBrowserRouter([
	{
	  path: "/",
	  element: <><HeaderPublico /><MotosDisponiveis /></>,
	  errorElement: <Error404 />,
	},
	{path: "login", element: <Login/>},
	{
		path: "gestao",
		element: <Outlet/>,
		children: [
			{index: true, element:<><HeaderPrivado/><GestaoIndex/></>},
		  {
			path: "moto",
			element: <Outlet/>,
			children: [
				{path: "cadastro", element: <><HeaderPrivado/><MotoCadastro/></>},
				{path: ":id", element: <><HeaderPrivado/><MotoDetalhes/></>},
				{path: "listar", element: <><HeaderPrivado/><MotoListagem/></>}
			]
		  },
		  {
			path: "modelo",
			element: <Outlet/>,
			children: [
				{path: "cadastro", element: <><HeaderPrivado/><ModeloCadastro/></>},
				{path: ":id", element: <><HeaderPrivado/><ModeloDetalhes/></>},
				{path: "listar", element: <><HeaderPrivado/><ModeloListagem/></>}
			]
		  },
		],
	  },
  ]);

	return (
		<>
			<RouterProvider router={router} />
			<Toaster />
		</>

	);
}

export default App;
