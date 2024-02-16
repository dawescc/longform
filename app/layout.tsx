import { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

const title = "longform — dawes.cc";
export const metadata: Metadata = {
	title: title,
	metadataBase: new URL(defaultUrl),
	openGraph: {
		title: title,
		url: new URL(defaultUrl),
		siteName: title,
	},
	twitter: {
		title: title,
		card: "summary_large_image",
		site: "@dawescc",
		creator: "@dawescc",
	},
	description: "A simple app.",
};

const ibm_mono = IBM_Plex_Mono({
	weight: ["100", "200", "300", "400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--font-ibm-mono",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang='en'
			className={`${ibm_mono.variable}`}>
			<body className='antialised font-mono site-colors'>
				<main className='w-full h-dvh flex flex-col items-center'>
					<Header />
					<div className='flex-grow max-h-full w-full max-w-xl mx-auto'>{children}</div>
				</main>
			</body>
		</html>
	);
}
