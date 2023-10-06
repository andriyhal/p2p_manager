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

	const [order] = [...orders].filter(order => order.adv.advNo === id);

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
		// debugger;
		page++;
		console.log(pair.asset);
	}

	if (amount !== newPrice && newPrice > 0) {
		nextToEditOrder(id, newPrice);
	}
};

// try {
// 	let foundOrder = false;

// 	while (!foundOrder) {
// 		const requestData = {
// 			fiat: pair.fiat,
// 			page: page,
// 			rows: 10,
// 			tradeType: action,
// 			asset: pair.asset,
// 			countries: [],
// 			payTypes: banks,
// 			proMerchantAds: false,
// 			shieldMerchantAds: false,
// 			publisherType: null
// 		};

// 		if (!foundOrder) {
// 			await new Promise(res => setTimeout(res, 500));
// 		}

// 		const response = await fetchTradersOrders(requestData);
// 		const orders = response.data;

// 		if (!orders || orders.length === 0) {
// 			console.log(`No more orders found, exiting. ${page}`);
// 			break;
// 		}

// 		function sellCheck(order) {
// 			let newPrice = parseFloat(order.adv.price) - beatBy;

// 			return (
// 				order.adv.price < priceLimit &&
// 				newPrice > priceLimit &&
// 				parseFloat(newPrice.toFixed(2)) !== amount
// 			);
// 		}

// 		function buyCheck(order) {
// 			let newPrice = parseFloat(order.adv.price) + beatBy;
// 			return (
// 				order.adv.price > priceLimit &&
// 				newPrice < priceLimit &&
// 				parseFloat(newPrice.toFixed(2)) !== amount
// 			);
// 		}

// 		const orderToBeat = orders.find(
// 			order =>
// 				order.adv.advNo !== id &&
// 				(action === 'BUY' ? sellCheck(order) : buyCheck(order))
// 		);

// 		if (orderToBeat) {
// 			let newPrice =
// 				action === 'SELL'
// 					? parseFloat(orderToBeat.adv.price) - beatBy
// 					: parseFloat(orderToBeat.adv.price) + beatBy;
// 			console.log(`Setting new price for ${action}: ${newPrice}`);
// 			foundOrder = true;
// 			nextToEditOrder(id);
// 		} else {
// 			page++;
// 		}
// 	}

// 	return foundOrder;
// } catch (error) {
// 	console.error('Error while checking and beating price:', error);
// 	return false;
// }
