import { createClient } from "@/utils/supabase/server";
import dayjs from "dayjs";
import { HeartIcon } from "lucide-react";
import Link from "next/link";

export default async function Index() {
	const supabase = createClient();
	let { data: articles, error } = await supabase.from("longform_prod").select("id, title, created_at, likes");

	return (
		<div className='pt-10 pb-20'>
			{articles && articles.length > 0 ? (
				<div
					key={articles[0]?.id}
					className='flex-1 px-2 sm:px-0'>
					<ul className='flex flex-col gap-2'>
						<span className='w-full flex items-baseline gap-4 text-xs p-2 pr-0 text-neutral-400 dark:text-neutral-500'>
							<span className='w-12'>date</span>
							<span className='flex-grow-1'>title</span>
							<span className='flex-grow'></span>
							<span className='flex-shrink-0'>
								<HeartIcon height={"1rem"} />
							</span>
						</span>
						{articles.map((article) => (
							<Link
								key={article.id}
								className='article-list-item'
								href={`/article/${article.id}`}>
								<span className='w-full flex items-baseline gap-4'>
									<span className='text-neutral-400 dark:text-neutral-500 text-xs'>{dayjs(article.created_at).format("MM/YYYY")}</span>
									<span className='flex-grow-1 text-sm'>{article.title}</span>
									<span className='flex-grow'></span>
									<span className='text-neutral-400 dark:text-neutral-500 text-xs'>{article.likes}</span>
								</span>
							</Link>
						))}
					</ul>
				</div>
			) : (
				<p className='w-full flex items-center justify-center'>No Articles &mdash; boo!</p>
			)}
		</div>
	);
}
