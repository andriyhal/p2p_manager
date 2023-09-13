import { WaitFor } from '../utils/wait-for';

export const getCurrentPath = () => {
	const path = document.location.pathname;
	const matchResult = path.match(/\/(\w+)$/);

	if (matchResult) {
		return matchResult[1];
	} else {
		return null;
	}
};

export const getInputEditPrice = () =>
	new Promise(resolve => {
		const INPUT_SELECTOR = 'input[data-bn-type="input"]';

		let interval = null;

		const checkInput = () => {
			const input = document.querySelectorAll(INPUT_SELECTOR)[0];

			if (input?.attributes?.length === 5) {
				resolve(input);
				clearInterval(interval);
			}
		};

		interval = setInterval(checkInput, 100);
		checkInput();
	});

export const getPostButton = () =>
	new Promise(resolve => {
		const BUTTONT_SELECTOR = 'button[data-bn-type="button"]';

		let interval = null;

		const checkButton = () => {
			const button =
				document.querySelectorAll(BUTTONT_SELECTOR)[5]?.parentElement
					.children[1];

			if (button?.attributes?.length === 2) {
				resolve(button);
				clearInterval(interval);
			}
		};

		interval = setInterval(checkButton, 3000);
		checkButton();
	});

export const getConfirmToPostButton = () =>
	new Promise(resolve => {
		const BUTTONT_SELECTOR = 'button[data-bn-type="button"]';

		let interval = null;

		const checkButton = () => {
			const button =
				document.querySelectorAll(BUTTONT_SELECTOR)[7]?.parentElement
					.children[1];

			if (button?.attributes?.length === 2) {
				resolve(button);
				clearInterval(interval);
			}
		};

		interval = setInterval(checkButton, 3000);
		checkButton();
	});

export const getOrderList = async () => {
	const waitFor = new WaitFor(100);
	let isLoaded = true;
	let orders = [];

	const updateOrders = () => {
		const todoElement = document.querySelectorAll('input[type="checkbox"]');

		orders = [...todoElement]
			.filter(e => e.id === '')
			.map(
				elem =>
					elem.parentElement.parentElement.parentElement.parentElement
			);

		if (orders.length > 0) {
			waitFor.stop();
			isLoaded = false;
		}
	};

	waitFor.start(() => updateOrders());

	while (isLoaded) {
		await new Promise(resolve => setTimeout(resolve, 1000));
	}

	return orders;
};

export const getTextsFromHtmlOrderElement = orderElement =>
	[...orderElement.children].map(collumnElement =>
		collumnElement.innerText.split('\n').filter(isText => isText !== '')
	);

export const convertParsedOrderInfoToObject = order => {
	const filteredOrderInfo = order.filter(arr => arr.length);

	try {
		return filteredOrderInfo[0][0];
	} catch (error) {
		return console.error(error);
	}
};
