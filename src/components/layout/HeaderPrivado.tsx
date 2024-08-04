import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { UserNav } from "./UserNav";
import { LogoMotogest } from "@/components/icons/logo_moto";


export function HeaderPrivado() {
	const menuItems = [
		{ name: "Início", href: "/gestao" },
		{ name: "Motos", href: "/gestao/moto" },
		{ name: "Modelos", href: "/gestao/modelo" },
		{ name: "Disponíveis", href: "/" },
	];

  return (
		<header className="bg-background sticky top-0 z-40 w-full border-b">
			<div className="container flex h-16 items-center justify-between px-4 md:px-6">
				<Link to="/" className="flex items-center gap-2">
					<LogoMotogest size={50} />
					<h1>MotoGest</h1>
				</Link>
				<nav className="hidden items-center gap-6 md:flex">
					<NavigationMenu>
						<NavigationMenuList>
							{menuItems.map((item) => (
								<NavigationMenuItem key={item.name}>
									<Link to={item.href} className={navigationMenuTriggerStyle()}>
										{" "}
										{item.name}{" "}
									</Link>
								</NavigationMenuItem>
							))}
						</NavigationMenuList>
					</NavigationMenu>
				</nav>
				<div className="flex items-center gap-4">
					<UserNav />
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="outline" size="icon" className="md:hidden">
								<Menu className="h-6 w-6" />
								<span className="sr-only">Abrir menu lateral</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-[300px]">
							<div className="flex flex-col gap-4 p-4">
								<Link to="/gestao" className="flex items-center gap-2">
									<LogoMotogest size={50} />
									<h1>MotoGest</h1>
								</Link>
								<nav className="flex flex-col gap-2">
									{menuItems.map((item) => (
										<Link
											key={item.name}
											to={item.href}
											className="text-lg font-medium"
										>
											{" "}
											{item.name}{" "}
										</Link>
									))}
								</nav>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
