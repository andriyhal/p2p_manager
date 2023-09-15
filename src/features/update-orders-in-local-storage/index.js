import { getCurrentPath } from '../../dom-scraper';
import { lockOrder } from '../../utils/order-locker';
import { nextToEditOrder } from '../edit-order-price';
import { processNextTask } from '../queuq-tasks';

const parseResponseDataJson = response => {
	return response.map(order => {
		return {
			id: order.adv.advNo,
			asset: order.adv.asset,
			fiat: order.adv.fiatUnit,
			tradeType: order.adv.tradeType,
			price: order.adv.price,
			tradeMethods: order.adv.tradeMethods,
			nickName: order.advertiser.nickName
		};
	});
};

const compareOrders = orders => {
	let editPrice = 0;
	
	const isDataPrice = localStorage.getItem('priceData');

	if (!isDataPrice) {
		const task = processNextTask();
		const [outOrder] = task ? orders.filter(order => order.id === task.orderId) : [null];
	
		if (outOrder) {
			const deletedOrder = orders.filter(order => order.id !== outOrder.id);
			localStorage.setItem('orders', JSON.stringify(deletedOrder));

			const filteredOrders = orders.filter(o => o.asset === outOrder.asset).filter(order =>
				order.tradeMethods.some(method =>
				  	outOrder.tradeMethods.some(outMethod => outMethod.identifier === method.identifier)
				)
			);

			while (filteredOrders.length) {
				const trader = filteredOrders.pop();

				let traderPrice = parseFloat(trader.price);

				if (
					trader.tradeType === 'SELL' &&
					parseFloat(outOrder.price) > traderPrice &&
					traderPrice > task.priceThreshold
				) {
					editPrice = traderPrice - task.targetOrderAmount;
				}

				if (
					trader.tradeType === 'BUY' &&
					parseFloat(outOrder.price) < traderPrice &&
					traderPrice < task.priceThreshold
				) {
					editPrice = traderPrice + task.targetOrderAmount;
				}
				

				if (getCurrentPath() !== 'advEdit' && editPrice > 0) {
					lockOrder();
					nextToEditOrder(outOrder.id, editPrice);
				}
			}
		}
	}
};

export const updateOrdersInLocalStorage = response => {
	const parsedData = parseResponseDataJson(response);
	let existingData = JSON.parse(localStorage.getItem('orders')) || [];
	

	const existingOrderMap = new Map(
		existingData.map(order => [order.id, order])
	);

	const currentTime = Math.floor(Date.now() / 1000);

	for (const serverOrder of parsedData) {
		if (existingOrderMap.has(serverOrder.id)) {
			const existingOrder = existingOrderMap.get(serverOrder.id);
			Object.assign(existingOrder, serverOrder);
			existingOrder.updatedTime = currentTime;
		} else {
			serverOrder.updatedTime = currentTime;
			existingData.push(serverOrder);
		}
	}

	const oneHourAgo = currentTime - 3600;
	existingData = existingData.filter(
		order => !order.updatedTime || order.updatedTime >= oneHourAgo
	);


	localStorage.setItem('orders', JSON.stringify(existingData));
	compareOrders(existingData);
	
};
