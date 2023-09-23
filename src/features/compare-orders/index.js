import { getCurrentPath } from '../../shared/lib/dom-scraper';
import { lockOrder } from '../../shared/lib/order-locker';
import { nextToEditOrder } from '../edit-order-price';
import { processNextTask } from '../../shared/lib/task-queue';

export const compareOrders = orders => {
	let editPrice = 0;

	const isDataPrice = localStorage.getItem('priceData');

	if (!isDataPrice) {
		const task = processNextTask();
		const [outOrder] = task
			? orders.filter(order => order.id === task.orderId)
			: [null];

		if (outOrder) {
			const deletedOrder = orders.filter(
				order => order.id !== outOrder.id
			);
			localStorage.setItem('orders', JSON.stringify(deletedOrder));

			const filteredOrders = orders
				.filter(o => o.asset === outOrder.asset)
				.filter(order =>
					order.tradeMethods.some(method =>
						outOrder.tradeMethods.some(
							outMethod =>
								outMethod.identifier === method.identifier
						)
					)
				);

			while (filteredOrders.length) {
				const trader = filteredOrders.pop();

				let traderPrice = parseFloat(trader.price);

				if (
					trader.tradeType === 'SELL' &&
					parseFloat(outOrder.price) > traderPrice &&
					traderPrice > task.priceLimit
				) {
					editPrice = traderPrice - task.beatBy;
				}

				if (
					trader.tradeType === 'BUY' &&
					parseFloat(outOrder.price) < traderPrice &&
					traderPrice < task.priceLimit
				) {
					editPrice = traderPrice + task.beatBy;
				}

				if (getCurrentPath() !== 'advEdit' && editPrice > 0) {
					lockOrder();
					nextToEditOrder(outOrder.id, editPrice);
				}
			}
		}
	}
};
