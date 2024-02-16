/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {},
			fontFamily: {
				mono: ["var(--font-ibm-mono)"],
			},
		},
	},
	plugins: [],
};