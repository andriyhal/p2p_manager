import { fetchTradersOrders } from './fetch-traders-orders';

let offset = 1;

export const fetchOrderPriceById = async orderId => {
	try {
		const { data: orders } = await fetchTradersOrders(offset);
		orders.length > 0 ? offset + 1 : 1;

		while (orders.length) {
			const trader = orders.pop();
		}

		const data = await response.json();
		return data.price;
	} catch (error) {
		console.error('Error fetching order price:', error);
		throw error;
	}
};
