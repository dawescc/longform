import isUser from "@/components/actions/isUser";
import AuthButton from "./AuthButton";
import Link from "next/link";

export default async function Header() {
	return (
		<nav className='w-full h-[64px] flex-none flex items-center px-4 md:px-6 border-b-[1px] border-b-black/10 dark:border-b-white/10'>
			<span className='inline-flex'>
				<Link
					className='hover:underline focus:underline'
					href={"https://dawes.cc"}>
					dawes
				</Link>
				{"/"}
				<Link
					className='hover:underline focus:underline'
					href={"/"}>
					longform
				</Link>
			</span>
			<div className='flex-1'></div>
			<div className='flex gap-4 items-center'>
				<AuthButton isLogged={await isUser()} />
			</div>
		</nav>
	);
}
