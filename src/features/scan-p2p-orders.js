import LocalStorageManager from '../utils/local-storage-manager';
import { fetchTradersOrders } from '../shared/api';
import { updateOrdersInLocalStorage } from './update-orders-in-local-storage';
import { isLocked } from '../utils/order-locker';

const settingsRequestData = new LocalStorageManager('SETTINGS_REQUEST_DATA');

const getTradeType = {
	BUY: 'SELL',
	SELL: 'BUY'
};

const assetTypes = ['USDT', 'BTC', 'BUSD', 'BNB', 'ETH', 'FDUSD'];
const getSettingsRequestData = settingsRequestData.readData() || {
	offsetAsset: 0,
	offsetPage: 1,
	tradeType: 'BUY'
};
let offsetAsset = getSettingsRequestData.offsetAsset;
let offsetPage = getSettingsRequestData.offsetPage;
let tradeType = getSettingsRequestData.tradeType;

export const p2pMonitoring = async () => {
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

		if (!isLocked()) {
			
			if (orders.length > 0) {
				updateOrdersInLocalStorage(orders);
	
				offsetPage++;
			} else {
				if (tradeType === 'BUY') {
					tradeType = 'SELL';
					offsetPage = 1;
				} else {
					offsetAsset++;
					if (offsetAsset === assetTypes.length) {
						offsetAsset = 0;
					}
	
					tradeType = 'BUY';
					offsetPage = 1;
				}
			}
		}
	} catch (error) {
		console.error('Error fetching and processing orders:', error);
	}

	setTimeout(p2pMonitoring, 500);
};
