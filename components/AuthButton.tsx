import Link from "next/link";
import { signOut } from "@/components/actions/UserAuth";
import { GithubIcon } from "lucide-react";

export default async function AuthButton({ isLogged }: { isLogged: boolean }) {
	return isLogged ? (
		<div className='flex items-center gap-4'>
			<form action={signOut}>
				<button className='button action'>Logout</button>
			</form>
		</div>
	) : (
		<Link
			href='https://github.com/dawescc'
			className='button default'>
			<GithubIcon size={"1rem"} />
		</Link>
	);
}
