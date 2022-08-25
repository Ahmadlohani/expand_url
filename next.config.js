/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		NEXT_PUBLIC_API: "http://localhost:3000/api",
	},
};

module.exports = nextConfig;
