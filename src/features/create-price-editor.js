import {
	getConfirmToPostButton,
	getInputEditPrice,
	getPostButton
} from '../dom-scraper';
import LocalStorageManager from '../utils/local-storage-manager';
import { unlockOrder } from '../utils/order-locker';

export const nextToEditOrder = (orderId, newPrice) => {
	const priceData = new LocalStorageManager('priceData');
	priceData.saveData({ orderId, newPrice });
	
	
	document.location.href =
		'https://p2p.binance.com/en/advEdit?code=' + orderId;
};

export const postOrder = async () => {
	const storageManager = new LocalStorageManager('priceData');
	const data = storageManager.readData();

	const priceInputElement = await getInputEditPrice();

	const lastValue = priceInputElement.value;
	priceInputElement.value = data.newPrice;
	const event = new Event('input', { bubbles: true });
	event.simulated = true;
	const tracker = priceInputElement._valueTracker;
	if (tracker) {
		tracker.setValue(lastValue);
	}
	priceInputElement.dispatchEvent(event);

	storageManager.saveData('');

	setTimeout(async () => {
		const postButton = await getPostButton();
		postButton.click();
		const confirmButton = await getConfirmToPostButton();
		confirmButton.click();
		unlockOrder();
	}, 1000);
};
