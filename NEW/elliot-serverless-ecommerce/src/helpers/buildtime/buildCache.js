export default async function buildCache(cacheKey, dataFn) {
	const shouldUseCache = !!process.env.USE_BUILD_CACHE;
	if (!shouldUseCache) return dataFn();

	const path = require("path");
	const fs = require("fs").promises;

	const cacheDir = path.resolve(".buildCache");
	const cacheFile = path.join(cacheDir, cacheKey);

	try {
		const data = await fs.readFile(cacheFile, "utf8");
		// console.log(`Using build cache for ${cacheKey}`);
		return JSON.parse(data).cacheData;
	} catch (_) {
		const data = await dataFn();
		try {
			try {
				await fs.mkdir(cacheDir);
			} catch (_) {
				/* make sure cacheDir exists */
			}

			await fs.writeFile(cacheFile, JSON.stringify({ cacheData: data }));
		} catch (err) {
			console.warn(`Failed to write build cache for ${cacheKey}`, err);
		}
		return data;
	}
}
