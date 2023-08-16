import axios from 'axios';
import { WaitFor } from './wait-for';
import createPriceEditor from "../../features/create-price-editor";
import LocalStorageManager from './local-storage-manager';

const URL = 'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search';
const localStorageManager = new LocalStorageManager('orderIds'); 

export default class BinanceP2PMonitor {
	constructor(orderId, fiat, tradeType, asset, minPrice) {
		//parameter
		this.fiat = fiat;
		this.tradeType = tradeType;
		this.asset = asset;
		//local
		this.orderId = orderId;
		this.minPrice = minPrice;
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
			tradeType: this.tradeType,
			asset: this.asset,
			countries: [],
            payTypes: ["Monobank", "PUMBBank"],
			proMerchantAds: false,
			shieldMerchantAds: false,
			publisherType: null,
			payTypes: []
		};
		
		const response = await axios.post(URL, postData);
		console.log(response.data);
		return response.data;
	}

	async getOrdersFromNextPage() {
		const {data: orders} = await this.fetchTradersOrders(this.offset);
		this.offset = orders.length > 0 ? this.offset + 1 : 0;

		orders.map((item, index) => {
			this.position++;
			this.traders.push(item);

			const order = localStorageManager.readData().filter(order => item.adv.advNo === order.orderId)

			if (order.orderType === 'SELL' && this.traders[0].adv.price > this.minPrice) {
				this.editPrice = this.traders[0].adv.price - 0.01;
			}
			//https://p2p.binance.com/en/advEdit?code=<orderId>
			if (order.orderType === 'BUY' && this.traders[0].adv.price < this.minPrice) {
				this.editPrice = this.traders[0].adv.price + 0.01;
			}
				
			
		});
	}

	handleEditPrice() {
		const orderEdit = createPriceEditor();
		orderEdit.editPrice(38.45);
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
