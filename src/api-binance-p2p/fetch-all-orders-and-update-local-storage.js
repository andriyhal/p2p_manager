import LocalStorageManager from '../utils/local-storage-manager';
import { fetchTradersOrders } from './fetch-traders-orders';

const p2pOrders = new LocalStorageManager('p2p_orders');
const settingsRequestData = new LocalStorageManager('SETTINGS_REQUEST_DATA');

const getTradeType = {
	BUY: 'SELL',
	SELL: 'BUY'
};

const statusUpdate = '';

const assetTypes = ['USDT', 'BTC', 'BUSD', 'BNB', 'ETH', 'FDUSD'];
const getSettingsRequestData = settingsRequestData.readData() || {
	offsetAsset: 0,
	offsetPage: 1,
	tradeType: 'BUY'
};
let offsetAsset = getSettingsRequestData.offsetAsset;
let offsetPage = getSettingsRequestData.offsetPage;
let tradeType = getSettingsRequestData.tradeType;

export const fetchAllOrdersAndUpdateLocalStorage = async () => {
	settingsRequestData.saveData({
		offsetAsset,
		offsetPage,
		tradeType
	});
	const requestData = {
		fiat: 'UAH',
		page: offsetPage,
		rows: 10,
		tradeType: getTradeType[tradeType],
		asset: assetTypes[offsetAsset],
		countries: [],
		payTypes: [],
		proMerchantAds: false,
		shieldMerchantAds: false,
		publisherType: null
	};

	try {
		const { data: orders } = await fetchTradersOrders(requestData);

		if (!orders) {
			throw new Error('Error fetching orders');
		}

		if (orders.length > 0) {
			// Обработать полученные ордеры, например, обновить localStorage
			console.log(orders);

			offsetPage++; // Увеличить offsetPage для следующего запроса
		} else {
			// Если ордеров больше нет, переключить тип ордера
			if (tradeType === 'BUY') {
				tradeType = 'SELL';
				offsetPage = 1; // Обнулить offsetPage для нового типа ордера
			} else {
				// Если ордеров больше нет для BUY и SELL, делаем смещение assetTypes
				offsetAsset++;
				if (offsetAsset === assetTypes.length) {
					offsetAsset = 0; // Обнуляем offsetAsset
				}

				tradeType = 'BUY'; // Возвращаемся к типу ордера BUY
				offsetPage = 1; // Обнулить offsetPage для нового типа ордера
			}
		}
	} catch (error) {
		console.error('Error fetching and processing orders:', error);
		// Обработка ошибок, если необходимо
	}

	setTimeout(fetchAllOrdersAndUpdateLocalStorage, 500);
};
