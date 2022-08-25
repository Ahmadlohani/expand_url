/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		NEXT_PUBLIC_API: "https://expand-url.vercel.app/api",
	},
};

module.exports = nextConfig;
