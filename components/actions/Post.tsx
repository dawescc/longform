"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function submitPost(formData: FormData) {
	const title = formData.get("title") as string;
	const content = formData.get("content") as string;

	const supabase = createClient();

	const { data, error } = await supabase.from("longform").insert([{ title: title, content: content }]);
	if (error) {
		throw error;
	} else return redirect("/");
}
