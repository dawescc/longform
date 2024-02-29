import LikeButton from "@/components/LikeButton";
import { createClient } from "@/utils/supabase/server";
import dayjs from "dayjs";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { remark } from "remark";
import html from "remark-html";

export default async function Page({ params }: { params: { id: string } }) {
	const supabase = createClient();
	let { data: article, error } = await supabase.from("longform_prod").select("*").eq("id", params.id).single();
	if (error) {
		return (
			<div className='flex flex-col gap-10 py-20 px-4 sm:px-0'>
				<div className='text-2xl font-medium'>Unable to load content</div>
				<div>An unknown error happened.</div>
				<Link
					href='/'
					className='button default mr-auto'>
					<MoveLeft />
					Back
				</Link>
			</div>
		);
	}
	const processedContent = await remark().use(html).process(article.content);
	const processedHTML = processedContent.toString();
	return (
		<div className='flex flex-col gap-10 py-20 px-4 sm:px-0'>
			<div className='w-full flex items-center justify-between'>
				<div className='flex flex-col gap-5'>
					<h1 className='font-semibold text-2xl'>{article.title}</h1>
					<span className='text-neutral-400 dark:text-neutral-500 text-sm'>{dayjs(article.created_at).format("MMMM YYYY")}</span>
				</div>
				<LikeButton article_id={params.id} />
			</div>
			<div
				className='flex flex-col gap-5 font-medium leading-relaxed whitespace-pre-wrap postContent'
				dangerouslySetInnerHTML={{ __html: processedHTML }}></div>
			<Link
				href='/'
				className='button default mr-auto'>
				<MoveLeft />
				Back
			</Link>
		</div>
	);
}
