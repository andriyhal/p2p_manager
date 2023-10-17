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

let page = 1;

export const scanP2pOrders = async () => {
	const { priceLimit, beatBy, id, action, pair, amount, banks } =
		Tasks.getNextTask();

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

	const { data: orders } = await fetchTradersOrders(requestData);
	if (!orders.length) {
		page = 1;
	}

	const [order] = [...orders].filter(
		(order, index) => order.adv.advNo === id && index === 0
	);

	if (!order) {
		while (orders.length) {
			const order = orders.pop();
			const amount = 1000;

			const orderPrice = convertStringToNumber(order.adv.price);
			const tradeTypeMultiplier = order.adv.tradeType === 'SELL' ? -1 : 1;
			const newPrice = orderPrice + tradeTypeMultiplier * beatBy;

			if (
				tradeTypeMultiplier * (amount - newPrice) > 0 &&
				tradeTypeMultiplier * (newPrice - priceLimit) > 0
			) {
				editPrice(order.id, newPrice, 'EDIT_PRICE');
			} else {
				console.log(`Order ${order.adv.advNo}: Price not edited`);
			}
		}

		page++;
	}
};
