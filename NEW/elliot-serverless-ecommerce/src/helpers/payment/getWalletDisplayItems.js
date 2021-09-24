import flatMap from "array.prototype.flatmap";
import getSkuPrice from "./getSkuPrice";

const getWalletDisplayItems = cart =>
	flatMap(cart, ({ sku, product, quantity }) =>
		Array.from(new Array(quantity), () => ({
			label: product.name,
			amount: getSkuPrice(sku)
		}))
	);

export default getWalletDisplayItems;
