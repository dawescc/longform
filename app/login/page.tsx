import Link from "next/link";
import { signIn } from "../../components/actions/UserAuth";
import { MoveLeft } from "lucide-react";

export default function Login({ searchParams }: { searchParams: { message: string } }) {
	return (
		<div className='h-dvh w-full flex flex-col place-items-center p-4 relative'>
			<div className='w-full h-full max-w-lg flex flex-col place-items-center'>
				<Link
					href='/'
					className='m-2 absolute top-0 left-0 button action flex items-center gap-2'>
					<MoveLeft />
					Back
				</Link>

				<form
					className='animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground'
					action={signIn}>
					<label
						className='text-md'
						htmlFor='email'>
						Email
					</label>
					<input
						className='rounded-md px-4 py-2 bg-black/10 dark:bg-white/10 border mb-6'
						name='email'
						placeholder='you@example.com'
						required
					/>
					<label
						className='text-md'
						htmlFor='password'>
						Password
					</label>
					<input
						className='rounded-md px-4 py-2 bg-black/10 dark:bg-white/10 border mb-6'
						type='password'
						name='password'
						placeholder='••••••••'
						required
					/>
					<button className='bg-black rounded-md px-4 py-2 text-white mb-2'>Sign In</button>
					{searchParams?.message && <p className='mt-4 p-4 bg-foreground/10 text-foreground text-center'>{searchParams.message}</p>}
				</form>
			</div>
		</div>
	);
}
