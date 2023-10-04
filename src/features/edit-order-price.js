import { EDIT_PRICE_STORAGE_KEY } from '../shared/config';
import {
	getConfirmToPostButton,
	getInputEditPrice,
	getPostButton
} from '../shared/lib/dom-scraper';
import LocalStorageManager from '../shared/lib/local-storage-manager';
import { unlockOrder } from '../shared/lib/order-locker';
import { updateAmountById } from './update-amount-by-id';

export const nextToEditOrder = (id, newPrice) => {
	const editPrice = new LocalStorageManager(EDIT_PRICE_STORAGE_KEY);
	editPrice.saveData({ id, newPrice });

	document.location.href = 'https://p2p.binance.com/en/advEdit?code=' + id;
};

export const postOrder = async () => {
	const storageManager = new LocalStorageManager(EDIT_PRICE_STORAGE_KEY);
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
