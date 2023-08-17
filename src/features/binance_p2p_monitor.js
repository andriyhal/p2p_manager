import axios from 'axios';
import { WaitFor } from '../utils/wait-for';
import createPriceEditor from "./create-price-editor";

const URL = 'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search';
const { updatePrice } = createPriceEditor();

export default class BinanceP2PMonitor {
	constructor(orderInfo) {
		//parameter
		this.asset = orderInfo.quoteCurrency[0];
		this.fiat = orderInfo.quoteCurrency[1];
		this.tradeType = orderInfo.orderType;
		this.payTypes = orderInfo.payTypes;
		
		//local
		this.orderId = orderInfo.orderId;
		this.price = orderInfo.price;
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
			tradeType: this.tradeType === 'SELL' ? 'BUY' : this.tradeType,
			asset: this.asset,
			countries: [],
            payTypes: this.payTypes,
			proMerchantAds: false,
			shieldMerchantAds: false,
			publisherType: null,
			payTypes: []
		};
		
		const response = await axios.post(URL, postData);
		
		return response.data;
	}

	async getOrdersFromNextPage() {
		const {data: orders} = await this.fetchTradersOrders(this.offset);
		this.offset = orders.length > 0 ? this.offset + 1 : 1;
		
		this.traders.push(...orders);

		const [order] = orders.filter(order => order.adv.advNo === this.orderId);
		
		while (this.traders.length && order) {
			const trader = this.traders.pop();

			if (order.adv.tradeType === 'SELL' && order.adv.price > trader.adv.price && trader.adv.price > this.price) {
				this.editPrice = trader.adv.price - 0.1;
			}

			if (order.adv.tradeType === 'BUY' && order.adv.price < trader.adv.price && trader.adv.price < this.price) {
				this.editPrice = trader.adv.price + 0.1;
			}

		}	
		
		
		if (document.location.pathname !== '/en/advEdit' && this.editPrice > 0) {
			console.log('next page');
			updatePrice(this.orderId, this.editPrice);

		}
	}

	handleEditPrice() {
		const orderEdit = createPriceEditor();
		orderEdit.updatePrice(this.editPrice);
		orderEdit.run();
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
