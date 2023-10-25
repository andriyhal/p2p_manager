export const getAssetPrice = async (fiat, asset) => {
	try {
		const response = await fetch(
			`https://api.binance.com/api/v3/ticker/price?symbol=${asset}${fiat}`
		);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return parseFloat(data.price);
	} catch (error) {
		console.error('Error fetching the price:', error);
	}
};
