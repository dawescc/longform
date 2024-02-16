import LikeButton from "@/components/LikeButton";
import { createClient } from "@/utils/supabase/server";
import dayjs from "dayjs";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
	const supabase = createClient();
	let article = await supabase.from("longform_prod").select("*").eq("id", params.id).single();
	return (
		<div className='flex flex-col gap-10 py-20 px-2 sm:px-0'>
			<div className='w-full flex items-center justify-between'>
				<div className='flex flex-col gap-5'>
					<h1 className='font-semibold text-2xl'>{article.data.title}</h1>
					<span className='text-neutral-400 dark:text-neutral-500 text-sm'>{dayjs(article.data.created_at).format("MMMM YYYY")}</span>
				</div>
				<LikeButton article_id={params.id} />
			</div>
			<div className='flex flex-col gap-5'>
				<p className='font-medium leading-relaxed'>{article.data.content}</p>
			</div>
			<Link
				href='/'
				className='button default mr-auto'>
				<MoveLeft />
				Back
			</Link>
		</div>
	);
}
