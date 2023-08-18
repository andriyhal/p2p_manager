import { getCurrentPath, getOrderList, parseOrderInfoFromHtml } from '../dom-helpers';
import LocalStorageManager from '../utils/local-storage-manager';

const localStorageManager = new LocalStorageManager('orderInfo'); 

export const saveOrderIdsToLocaleStorage = () => {
    getOrderList().then(orders => {
        if (getCurrentPath() === 'myads') {
            const dataOrders = [...orders].map(parseOrderInfoFromHtml);

            localStorageManager.saveData(dataOrders);
        }

        if (!localStorageManager.readData()) {
            document.location.href = 'https://p2p.binance.com/en/myads?type=normal&code=default';
        }
    });
}

