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
	if (!Tasks.getStatusUpdatePrice()) {
		const { priceLimit, beatBy, id, action, pair, amount, banks } =
			Tasks.getNextTask();

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
			publisherType: null
		};
		await new Promise(res => setTimeout(res, 500));

		const { data: orders } = await fetchTradersOrders(requestData);

		if (!orders.length) {
			pages[pair.asset] = 1;
		}

		const [existingOrder] = [...orders].filter(
			(order, index) => order.adv.advNo === id && index === 0
		);

		console.log({page: pages[pair.asset], asset: pair.asset});

		if (!existingOrder) {
			while (orders.length) {
				const order = orders.pop();

				const orderPrice = convertStringToNumber(order.adv.price);
				const tradeType = order.adv.tradeType;
				const newPrice =
					tradeType === 'SELL'
						? orderPrice - beatBy
						: orderPrice + beatBy;

				if (
					(tradeType === 'SELL' &&
						amount > newPrice &&
						newPrice > priceLimit) ||
					(tradeType === 'BUY' &&
						amount < newPrice &&
						newPrice < priceLimit)
				) {
					Tasks.setStatusUpdatePrice(true);
					pages[pair.asset] = 1;
					console.log(
						`Amount: ${amount} Price limit: ${priceLimit} New price: ${newPrice} Last order: ${order}`
					);
					editPrice(id, newPrice, 'EDIT_PRICE');
					
					break;
				}
			}
		} 
		pages[pair.asset]++;
	}
};
