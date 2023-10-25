import { calculatePriceFromSpot } from '../../content_script/calculatePriceFromSpot';
import { getAssetPrice } from '../../shared/api/get_asset_price';
import { Tasks } from '../data/tasks_info';
import { editPrice } from '../edit_price';

const fetchTradersOrders = async requestData => {
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

const convertStringToNumber = str => {
	let cleanedStr = str.replace(/,/g, '');

	cleanedStr = cleanedStr.replace('.', ',');
	cleanedStr = cleanedStr.replace(',', '.');

	return parseFloat(cleanedStr);
};

let pages = {};

export const scanP2pOrders = async () => {
	const nextTask = Tasks.getNextTask();

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

		// {
		//     "fiat": "UAH",
		//     "page": 1,
		//     "rows": 10,
		//     "tradeType": "BUY",
		//     "asset": "USDT",
		//     "countries": [],
		//     "proMerchantAds": false,
		//     "shieldMerchantAds": false,
		//     "publisherType": null,
		//     "payTypes": [],
		//     "classifies": [
		//         "mass",
		//         "profession"
		//     ]
		// }

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
			publisherType: null
		};
		await new Promise(res => setTimeout(res, 1500));

		const { data: orders } = await fetchTradersOrders(requestData);
		await new Promise(res => setTimeout(res, 1500));
		const spotPrice = await getAssetPrice(pair.fiat, pair.asset);

		if (!orders.length) {
			pages[pair.asset] = 1;
		} else {
			pages[pair.asset]++;
		}

		const [existingOrder] = [...orders].filter(
			(order, index) => order.adv.advNo === id && index === 0
		);

		// console.log('response orders: ', orders);
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

				// console.log(
				// 	`Trade type: ${action} percentage: ${percentage} existing percentage: ${existingPercentage} p2p price: ${p2pPrice} new p2p price: ${newPrice}`
				// );

				if (
					(tradeType === 'SELL' &&
						p2pPrice > newPrice &&
						percentage > existingPercentage) ||
					(tradeType === 'BUY' &&
						p2pPrice < newPrice &&
						percentage < existingPercentage)
				) {
					Tasks.setStatusUpdatePrice(true);

					pages[pair.asset] = 1;

					console.log(
						`Amount: ${p2pPrice} Price limit: ${priceLimit} New price: ${newPrice}`
					);

					editPrice(id, newPrice, 'EDIT_PRICE');

					break;
				}
			}
		}
	}
};
