import dayjs from "dayjs";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { submitPost } from "@/components/actions/Post";

export default function New() {
	return (
		<form
			action={submitPost}
			className='flex flex-col h-full gap-10 py-20 px-2 sm:px-0'>
			<div className='w-full flex items-center justify-between'>
				<div className='flex flex-col gap-5'>
					<input
						required
						name='title'
						placeholder='Title'
						className='font-semibold text-2xl bg-transparent focus:ring-0 h-full p-2 resize-none'></input>
					<span className='text-neutral-400 dark:text-neutral-500 text-sm pl-2'>{dayjs(new Date()).format("MMMM YYYY")}</span>
				</div>
			</div>

			<div className='flex flex-col gap-5 flex-grow'>
				<textarea
					required
					name='content'
					placeholder='Content'
					className='bg-transparent focus:ring-0 h-full p-2 resize-none font-medium leading-relaxed whitespace-pre-wrap'
				/>
			</div>

			<div className='flex items-center justify-between'>
				<Link
					href='/'
					className='button default'>
					<MoveLeft />
					Back
				</Link>
				<button className='button action'>Post</button>
			</div>
		</form>
	);
}
