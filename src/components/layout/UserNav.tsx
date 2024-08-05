import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import useAuthUser from "@/hooks/useAuthUser";
import { useNavigate } from "react-router-dom";

export function UserNav() {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);
	const { logout } = useAuthUser();

	const userData = user?.user_metadata;

	async function handleLogout() {
		try {
			await logout();
			navigate("/");
		} catch (error) {
			toast({
				title: "Ops!",
				description: error.message,
				variant: "destructive",
			});
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-8 w-8">
						<AvatarImage
							src={userData?.avatar_url ?? ""}
							alt={userData?.full_name ?? "Avatar do usuário"}
						/>
						<AvatarFallback>{userData?.full_name?.[0]}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">
							{userData?.full_name}
						</p>
						<p className="text-xs leading-none text-muted-foreground">
							{user?.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
