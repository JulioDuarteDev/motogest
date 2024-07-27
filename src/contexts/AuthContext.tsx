import { Session, User } from "@supabase/supabase-js";
import { useState, useEffect, createContext } from "react";
import  supabase  from "@/services/supabaseClient";

interface AuthContextProps {
	session: Session | null | undefined;
	user: User | null | undefined;
	isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User>();
	const [session, setSession] = useState<Session | null>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const setData = async () => {
			const {
				data: { session },
				error,
			} = await supabase.auth.getSession();
			if (error) throw error;
			setSession(session);
			setUser(session?.user);
			setLoading(false);
		};

		const { data: listener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setSession(session);
				setUser(session?.user);
				setLoading(false);
			}
		);

		setData();

		return () => {
			listener?.subscription.unsubscribe();
		};
	}, []);

	const isLoggedIn = !!user;

	const valuesProvider = {
		session,
		user,
		isLoggedIn,
	};

	return (
		<AuthContext.Provider value={valuesProvider}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

