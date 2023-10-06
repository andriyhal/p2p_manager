import { fetchTradersOrders } from '../shared/api';
import { processNextTask } from '../shared/lib/task-queue';
import { nextToEditOrder } from './edit-order-price';

let task = processNextTask();
let page = 1;

export const scanP2pOrders = async () => {
	const { priceLimit, beatBy, id, action, pair, amount, banks } = task;

	const requestData = {
		fiat: pair.fiat,
		page: page,
		rows: 10,
		tradeType: action,
		asset: pair.asset,
		countries: [],
		payTypes: banks,
		proMerchantAds: false,
		shieldMerchantAds: false,
		publisherType: null
	};
	await new Promise(res => setTimeout(res, 500));
	let newPrice = 0;
	const { data: orders } = await fetchTradersOrders(requestData);
	if (!orders.length) {
		task = processNextTask();
		page = 1;
	}

	const [order] = [...orders].filter(
		(order, index) => order.adv.advNo === id && index === 0
	);

	if (!order) {
		while (orders.length) {
			const order = orders.pop();

			if (
				order.adv.tradeType === 'SELL' &&
				amount > order.adv.price &&
				order.adv.price > priceLimit
			) {
				newPrice = order.adv.price - beatBy;
			}

			if (
				order.adv.tradeType === 'BUY' &&
				amount < order.adv.price &&
				order.adv.price < priceLimit
			) {
				newPrice = order.adv.price + beatBy;
			}
		}

		page++;
		console.log(pair.asset);
	} else task = processNextTask();

	if (amount !== newPrice && newPrice > 0) {
		nextToEditOrder(id, newPrice);
	}
};
