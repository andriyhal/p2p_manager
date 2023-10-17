import {
	getConfirmToPostButton,
	getInputEditPrice,
	getPostButton
} from '../shared/lib/dom-scraper';
import { unlockOrder } from '../shared/lib/order-locker';

export const postOrder = async newPrice => {
	const priceInputElement = await getInputEditPrice();

	const lastValue = priceInputElement.value;
	priceInputElement.value = newPrice;

	const event = new Event('input', { bubbles: true });
	event.simulated = true;

	const tracker = priceInputElement._valueTracker;

	if (tracker) {
		tracker.setValue(lastValue);
	}

	priceInputElement.dispatchEvent(event);

	setTimeout(async () => {
		const postButton = await getPostButton();
		postButton.click();
		const confirmButton = await getConfirmToPostButton();
		confirmButton.click();

		chrome.runtime.onMessage.addListener(
			(request, sender, sendResponse) => {
				if (request.action === 'EDIT_PRICE') {
					chrome.runtime.sendMessage(
						{
							action: 'CLOSE_WINDOW',
							type: 'CONTENT',
							tasks:
								JSON.parse(localStorage.getItem('tasksInfo')) ||
								[],
							windowId: request.windowId
						},
						response => console.log(response)
					);
				}
			}
		);
	}, 1000);
};
