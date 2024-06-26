import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["cdn.sanity.io", "picsum.photos", "images.unsplash.com", "google.com"],
	},
};

export default withNextIntl(nextConfig);
