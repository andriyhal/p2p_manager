import axios from 'axios';
import { WaitFor } from '../utils/wait-for';
import { nextToEditOrder } from './create-price-editor';
import { getCurrentPath } from '../dom-scraper';
import { updatePriceInLocalStorage } from './update-price-in-local-storage';
import { processNextTask } from './queuq-tasks';

const URL = 'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search';

export default class BinanceP2PMonitor {
	constructor() {
		//parameter
		this.asset = null;
		this.fiat = null;
		this.tradeType = null;
		this.payTypes = null;

		//local
		this.orderId = null;
		this.priceThreshold = null;
		this.orderPrice = null;
		this.targetOrderAmount = null;

		this.offset = 1;
		this.position = 0;
		this.traders = [];
		this.editPrice = 0;
		this.waitFor = new WaitFor(2000);
	}

	initializeOrderInfo(orderInfo) {
		this.asset = orderInfo.quoteCurrency[0];
		this.fiat = orderInfo.quoteCurrency[1];
		this.tradeType = orderInfo.tradeType;
		this.payTypes = orderInfo.payTypes;
		this.orderId = orderInfo.orderId;
		this.orderPrice = parseFloat(orderInfo.orderPrice.replace(/,/g, ''));
		this.priceThreshold = orderInfo.priceThreshold;
		this.targetOrderAmount = orderInfo.targetOrderAmount;
	}

	async fetchTradersOrders(offset) {
		const postData = {
			fiat: this.fiat,
			page: offset,
			rows: 10,
			tradeType: this.tradeType === 'SELL' ? 'BUY' : 'SELL',
			asset: this.asset,
			countries: [],
			payTypes: this.payTypes,
			proMerchantAds: false,
			shieldMerchantAds: false,
			publisherType: null
		};

		const response = await axios.post(URL, postData);

		return response.data;
	}

	async getOrdersFromNextPage() {
		const { data: orders } = await this.fetchTradersOrders(this.offset);
		const task = {};
		this.offset++;
		this.editPrice = 0;
		console.log('status work...');

		if (orders.length % 10 !== 0) {
			this.initializeOrderInfo(processNextTask());
			this.offset = 1;
		}

		while (orders.length) {
			const trader = orders.pop();

			let traderPrice = parseFloat(trader.adv.price.replace(/,/g, ''));

			if (
				trader.adv.tradeType === 'SELL' &&
				this.orderPrice > traderPrice &&
				traderPrice > this.priceThreshold &&
				this.orderId !== trader.adv.advNo
			) {
				this.editPrice = traderPrice - this.targetOrderAmount;
				console.log(this.orderId, trader);
			}

			if (
				trader.adv.tradeType === 'BUY' &&
				this.orderPrice < traderPrice &&
				traderPrice < this.priceThreshold &&
				this.orderId !== trader.adv.advNo
			) {
				this.editPrice = traderPrice + this.targetOrderAmount;
				console.log(this.orderId, trader);
			}
		}

		if (getCurrentPath() !== 'advEdit' && this.editPrice > 0) {
			const currentTime = new Date();
			const hours = currentTime.getHours();
			const minutes = currentTime.getMinutes();
			const seconds = currentTime.getSeconds();

			console.log(`Update price: ${hours}:${minutes}:${seconds}`);
			this.offset = 1;

			updatePriceInLocalStorage(this.orderId, this.editPrice);
			nextToEditOrder(this.orderId, this.editPrice);
		}
	}

	startMonitoring() {
		this.waitFor.start(() => {
			this.getOrdersFromNextPage();
		});
	}

	stopMonitoring() {
		this.waitFor.stop();
	}
}
