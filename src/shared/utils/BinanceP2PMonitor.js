import axios from 'axios';
import { WaitFor } from './wait-for';

const URL = 'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search';

export class BinanceP2PMonitor {
    constructor(userName, fiat, tradeType, asset, price) {
        this.offset = 1;
        this.typeCoin = typeCoin;
        this.side = side;
        this.userName = userName;
        this.waitFor = new WaitFor(2000);
        this.fiat = fiat;
        this.tradeType = tradeType;
        this.asset = asset;
        this.price = price;
        this.position = 0;
        this.traders = [];
    }

    async sendPostRequest(offset) {
        const postData = {
        fiat: this.fiat,
        page: offset,
        rows: 10,
        tradeType: this.tradeType,
        asset: this.asset,
        countries: [],
        proMerchantAds: false,
        shieldMerchantAds: false,
        publisherType: null,
        payTypes: []
        };

        const response = await axios.post(URL, postData);

        return response.data;
    }

    async updateMethod() {
        const response = await this.sendPostRequest(this.offset);

        response.data.filter((item, index) => {
            this.position++;
            if (item.advertiser.nickName === this.userName) {
                console.log('class P2PTraderMonitor user position: ',item.advertiser.nickName + ' ' + this.position);
            }
        });

        this.offset++;
    }

    startMonitoring() {
        this.waitFor.start(() => {
            this.offset = 1;
            this.position = 0;
            this.updateMethod();
        });
    }

    stopMonitoring() {
        this.waitFor.stop();
    }
}