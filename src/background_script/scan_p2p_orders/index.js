import { calculatePriceFromSpot } from '../../shared/lib/calculate_price_from_spot';
import { getAssetPrice } from '../../shared/api/get_asset_price';
import { getTradersOrders } from '../../shared/api/get_traders_orders';
import { convertStringToNumber } from '../../shared/lib/convert_string_to_number';
import { Tasks } from '../data/tasks_info';
import { editPrice } from '../edit_price';

let pages = {};

export const scanP2pOrders = async () => {
	const nextTask = Tasks.getNextTask();
	let date = new Date(2011, 0, 1, 2, 3, 4, 567);
	if (!Tasks.getStatusUpdatePrice() && nextTask) {
		const {
			percentage,
			beatBy,
			id,
			action,
			pair,
			p2pPrice,
			banks,
			isMerchant
		} = nextTask;

		if (!pages[pair.asset]) {
			pages[pair.asset] = 1;
		}

		const requestData = {
			fiat: pair.fiat,
			page: pages[pair.asset],
			rows: 10,
			tradeType: action,
			asset: pair.asset,
			countries: [],
			payTypes: banks,
			proMerchantAds: false,
			shieldMerchantAds: false,
			publisherType: isMerchant
		};
		await new Promise(res => setTimeout(res, 1500));

		const { data: orders } = await getTradersOrders(requestData);

		const spotPrice = await getAssetPrice(pair.fiat, pair.asset);

		if (!orders.length) {
			pages[pair.asset] = 1;
		} else {
			pages[pair.asset]++;
		}

		const [existingOrder] = [...orders].filter(
			(order, index) => order.adv.advNo === id && index === 0
		);

		if (!existingOrder) {
			while (orders.length) {
				const order = orders.shift();

				const orderPrice = convertStringToNumber(order.adv.price);
				const tradeType = order.adv.tradeType;
				const newPrice =
					tradeType === 'SELL'
						? orderPrice - beatBy
						: orderPrice + beatBy;

				const existingPercentage = calculatePriceFromSpot({
					p2pPrice: newPrice,
					spotPrice
				});

				if (
					(tradeType === 'SELL' &&
						p2pPrice > newPrice &&
						percentage < existingPercentage) ||
					(tradeType === 'BUY' &&
						p2pPrice < newPrice &&
						percentage > existingPercentage)
				) {
					Tasks.setStatusUpdatePrice(true);

					pages[pair.asset] = 1;

					editPrice(id, newPrice, 'EDIT_PRICE');

					break;
				}
			}
		}
	}
};
