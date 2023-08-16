import LocalStorageManager from '../shared/utils/local-storage-manager';
import { getOrders } from './get_orders';

const localStorageManager = new LocalStorageManager('orderIds'); 

export const parseOrderInfoFromHtml = htmlElement => {
    const orderId = htmlElement.querySelectorAll('div[data-bn-type="text"]')[0].innerText;
    const orderType = htmlElement.querySelectorAll('div[data-bn-type="text"]')[1].innerText;
    const quoteCurrency = htmlElement.querySelectorAll('div[data-bn-type="text"]')[2].innerText.split(' / ');
    const payTypes = htmlElement.querySelectorAll('div[data-bn-type="text"]')[11].innerText;

    return {orderId, orderType, quoteCurrency, payTypes};
}

 export const saveOrderIdsToLocaleStorage = () => {
    getOrders().then(orders => {
        if (document.location.pathname === '/en/myads') {
            const dataOrders = [...orders].map(parseOrderInfoFromHtml);

            localStorageManager.saveData(dataOrders);
        }

        if (!localStorageManager.readData()) {
            document.location.href = 'https://p2p.binance.com/en/myads?type=normal&code=default';
        }
    });
}

