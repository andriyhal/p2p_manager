import LocalStorageManager from '../utils/local-storage-manager';
import { getOrders } from './get_orders';

const localStorageManager = new LocalStorageManager('orderInfo'); 

export const parseOrderInfoFromHtml = htmlElement => {
    // TODO: make it 1 lne in phase 2
    const orderId = htmlElement.querySelectorAll('div[data-bn-type="text"]')[0]?.innerText;
    const orderType = htmlElement.querySelectorAll('div[data-bn-type="text"]')[1]?.innerText;
    const quoteCurrency = htmlElement.querySelectorAll('div[data-bn-type="text"]')[2]?.innerText.split(' / ');
    const price = htmlElement.querySelectorAll('div[data-bn-type="text"]')[6].innerText;
    const payTypes = htmlElement.querySelectorAll('div[data-bn-type="text"]')[8].innerText.split(' ');

    return {orderId, orderType, quoteCurrency, price, payTypes};
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

