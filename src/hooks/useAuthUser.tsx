
import supabase from "@/services/supabaseClient";
import { Provider } from "@supabase/supabase-js";

interface Login{
	email: string;
	senha: string;
}

export interface Cadastro extends Login {
	nome: string;
}

export default function useAuthUser() {
	const login = async ({ email, senha }: Login) => {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password: senha,
		});
		if (error) throw error;
	};

	const loginWithSocialProvider = async (provider: Provider) => {
		const { error } = await supabase.auth.signInWithOAuth({ provider });

		if (error) throw error;
	};

	const logout = async () => {
		const { error } = await supabase.auth.signOut();

		if (error) throw error;
	};

	return {
		login,
		loginWithSocialProvider,
		logout,
	};
}
