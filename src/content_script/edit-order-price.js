import {
	findButtonByText,
	getConfirmToPostButton,
	getInputEditPrice,
	getPostButton,
	waitForElement
} from '../shared/lib/dom-scraper';

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
		try {
			const buttonPost = await findButtonByText([
				'Post',
				'Text2',
				'Text3'
			]);

			buttonPost.click();

			const buttonConfirm = await findButtonByText([
				'Confirm to post',
				'Text2',
				'Text3'
			]);

			buttonConfirm.click();
		} catch (error) {
			console.error('Error:', error);
		}
	}, 1000);
};
