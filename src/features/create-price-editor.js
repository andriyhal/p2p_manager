import {
	getConfirmToPostButton,
	getInputEditPrice,
	getPostButton
} from '../dom-scraper';
import LocalStorageManager from '../utils/local-storage-manager';
import runOnWindowLoad from '../utils/run-on-window-load';

export const nextToEditOrder = (orderId, newPrice) => {
	const priceData = new LocalStorageManager('priceData');
	priceData.saveData({ orderId, newPrice });

	document.location.href =
		'https://p2p.binance.com/en/advEdit?code=' + orderId;
};

export const postOrder = () => {
	const storageManager = new LocalStorageManager('priceData');
	const data = storageManager.readData();

	runOnWindowLoad(() => {
		getInputEditPrice().then(priceInputElement => {
			const lastValue = priceInputElement.value;
			priceInputElement.value = data.newPrice;
			const event = new Event('input', { bubbles: true });
			event.simulated = true;
			const tracker = priceInputElement._valueTracker;
			if (tracker) {
				tracker.setValue(lastValue);
			}
			priceInputElement.dispatchEvent(event);
			storageManager.saveData(false);
		});

		getPostButton().then(button => button.click());
		getConfirmToPostButton().then(button => button.click());
	});
};
