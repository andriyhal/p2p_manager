export const getTradersOrders = async requestData => {
	try {
		const apiUrl =
			'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search';
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestData)
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return response.json();
	} catch (error) {
		console.error('Fetch error: ', error.message);
		throw error;
	}
};
