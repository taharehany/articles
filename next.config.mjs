import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "source.unsplash.com",
			},
			{
				hostname: "picsum.photos",
			},
			{
				hostname: "cdn.sanity.io",
			},
			{
				hostname: "images.unsplash.com",
			},
		],
	},
};

export default withNextIntl(nextConfig);
