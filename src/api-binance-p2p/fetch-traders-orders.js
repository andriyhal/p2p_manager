import axios from 'axios';
const URL = 'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search';

export const fetchTradersOrders = async postData => {
	const response = await axios.post(URL, postData);

	return response.data;
};
