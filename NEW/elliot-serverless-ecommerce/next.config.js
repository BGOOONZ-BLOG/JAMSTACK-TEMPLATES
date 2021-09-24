const path = require("path");
const withImages = require("next-images");

module.exports = withImages({
	webpack: (config, { isServer }) => {
		if (config.resolve.modules) {
			config.resolve.modules.unshift(path.resolve(__dirname, "src"));
		}
		if (isServer) {
			// we're in build mode so enable fs caching for data
			process.env.USE_BUILD_CACHE = "true";
		}
		return config;
	},
	experimental: {
		async rewrites() {
			return [
				{
					source: "/",
					destination: "/index.html"
				}
			];
		},
		async redirects() {
			return [
				{
					source: "/:path+/",
					destination: "/:path+",
					permanent: false
				}
			];
		}
	}
});
