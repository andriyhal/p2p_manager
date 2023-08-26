import axios from 'axios';
import { WaitFor } from '../utils/wait-for';
import { nextToEditOrder } from './create-price-editor';
import { getCurrentPath } from '../dom-scraper';
import { updatePriceInLocalStorage } from './update-price-in-local-storage';

const URL = 'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search';

export default class BinanceP2PMonitor {
	constructor(orderInfo) {
		//parameter
		this.asset = orderInfo.quoteCurrency[0];
		this.fiat = orderInfo.quoteCurrency[1];
		this.tradeType = orderInfo.tradeType;
		this.payTypes = orderInfo.payTypes;

		//local
		this.orderId = orderInfo.orderId;
		this.priceThreshold = orderInfo.priceThreshold;
		this.orderPrice = parseFloat(orderInfo.orderPrice.replace(/,/g, ''));
		this.targetOrderAmount = orderInfo.targetOrderAmount;

		this.offset = 1;
		this.position = 0;
		this.traders = [];
		this.editPrice = 0;
		this.waitFor = new WaitFor(2000);
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
		this.offset = orders.length > 0 ? this.offset + 1 : 1;
		this.editPrice = 0;
		console.log('status work...');
		while (orders.length) {
			const trader = orders.pop();

			let traderPrice = parseFloat(trader.adv.price.replace(/,/g, ''));

			if (
				trader.adv.tradeType === 'SELL' &&
				this.orderPrice > traderPrice &&
				traderPrice > this.priceThreshold
			) {
				this.editPrice = traderPrice - this.targetOrderAmount;
			}

			if (
				trader.adv.tradeType === 'BUY' &&
				this.orderPrice < traderPrice &&
				traderPrice < this.priceThreshold
			) {
				this.editPrice = traderPrice + this.targetOrderAmount;
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
