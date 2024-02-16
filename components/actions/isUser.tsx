"use server";

import { createClient } from "@/utils/supabase/server";

export default async function isUser() {
	const CheckforUser = async () => {
		try {
			const supabase = createClient();
			const {
				data: { user },
			} = await supabase.auth.getUser();

			return !!user;
		} catch (e) {
			return false;
		}
	};

	const isLogged = await CheckforUser();

	return isLogged;
}
