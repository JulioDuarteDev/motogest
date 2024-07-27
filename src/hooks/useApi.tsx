import  supabase  from '@/services/supabaseClient';

export default function useApi() {

	const list = async (table: string) => {
		const { data, error } = await supabase.from(table).select("*");

		if (error) throw error;
		return data;
	};

	const getById = async (table: string, id: string) => {
		const { data, error } = await supabase.from(table).select("*").eq("id", id);

		if (error) throw error;
		return data[0];
	};

	const post = async (table: string, form: object) => {
		const { error } = await supabase.from(table).insert({ ...form });
		if (error) throw error;
	}

	return {
		list,
		getById,
		post
	};
}