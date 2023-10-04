import { fetchTradersOrders } from '../shared/api';
import { processNextTask } from '../shared/lib/task-queue';
import { nextToEditOrder } from './edit-order-price';

export const scanP2pOrders = async () => {
	try {
		const task = processNextTask();

		if (!task) return;

		const { priceLimit, beatBy, id, action, pair, amount, banks } = task;
		const requestData = {
			fiat: pair.fiat,
			page: 1,
			rows: 10,
			tradeType: action === 'SELL' ? 'SELL' : 'BUY',
			asset: pair.asset,
			countries: [],
			payTypes: banks,
			proMerchantAds: false,
			shieldMerchantAds: false,
			publisherType: null
		};

		const response = await fetchTradersOrders(requestData);
		const orders = response.data;

		const topOrder = orders.find(order => order.adv.advNo !== id);

		if (!topOrder) {
			console.log(
				'No orders to compete with or all orders belong to the user'
			);
			return;
		}

		let newPrice;
		if (action === 'SELL') {
			newPrice = parseFloat(topOrder.adv.price) - beatBy;
			console.log('working...');

			if (
				newPrice > priceLimit &&
				parseFloat(newPrice.toFixed(2)) !== amount
			) {
				console.log(`Setting new price for SELL: ${newPrice}`);

				nextToEditOrder(id, newPrice);
			}
		} else {
			newPrice = parseFloat(topOrder.adv.price) + beatBy;

			if (
				newPrice < priceLimit &&
				parseFloat(newPrice.toFixed(2)) !== amount
			) {
				console.log(`Setting new price for BUY: ${newPrice}`);

				// nextToEditOrder(id, newPrice);
			}
		}
	} catch (error) {
		console.error('Error while checking and beating price:', error);
	}
};
