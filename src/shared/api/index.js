import axios from 'axios';
const URL = 'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search';

export const fetchTradersOrders = async postData => {
	try {
		const response = await axios.post(URL, postData);
		return response.data;
	} catch (error) {
		if (error.response && error.response.status === 429) {
			console.log('Too many requests, slowing down...');
			await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds if rate limit is hit
			return await fetchTradersOrders(postData); // Retry
		}
		throw error; // If it's not a 429 error, throw it
	}
};
