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

export const findElementByTraversal = (
	startingElement,
	traversalPath,
	attributeCount,
	intervalTime = 1000,
	maxAttempts = 10
) =>
	new Promise((resolve, reject) => {
		let attempts = 0;
		const interval = setInterval(() => {
			let currentElement = startingElement;

			for (const step of traversalPath) {
				if (step.type === 'parent') {
					currentElement = currentElement.parentElement;
				} else if (step.type === 'child') {
					currentElement = currentElement.children[step.index];
				} else if (step.type === 'sibling') {
					currentElement = currentElement.nextElementSibling;
				}
				console.log(currentElement);
				if (!currentElement) {
					break;
				}
			}

			if (
				currentElement &&
				currentElement.attributes.length === attributeCount
			) {
				clearInterval(interval);
				resolve(currentElement);
				return;
			}

			attempts++;
			if (attempts >= maxAttempts) {
				clearInterval(interval);
				reject(
					new Error(`Element not found after ${attempts} attempts.`)
				);
			}
		}, intervalTime);
	});

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

		interval = setInterval(checkInput, 500);
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

		interval = setInterval(checkButton, 2000);
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

		interval = setInterval(checkButton, 2000);
		checkButton();
	});

// export const getPostButton = async () => {
// 	while (
// 		document.querySelectorAll('button[data-bn-type="button"]')[5]
// 			?.parentElement.children[1]?.innerText !== 'Post'
// 	) {
// 		await new Promise(resolve => setTimeout(resolve, 1000));
// 	}

// 	return document.querySelectorAll('button[data-bn-type="button"]')[5]
// 		.parentElement.children[1];
// };

// export const getConfirmToPostButton = async () => {
// 	while (
// 		document.querySelectorAll('button[data-bn-type="button"]')[7]
// 			?.parentElement?.children[1].innerText !== 'Confirm to post'
// 	) {
// 		await new Promise(resolve => setTimeout(resolve, 1000));
// 	}

// 	return document.querySelectorAll('button[data-bn-type="button"]')[7]
// 		?.parentElement?.children[1];
// };

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
		return {
			orderId: filteredOrderInfo[0][0],
			tradeType: filteredOrderInfo[0][1],
			quoteCurrency: filteredOrderInfo[0][2].split(' / '),
			orderPrice: filteredOrderInfo[2][0],
			payTypes: filteredOrderInfo[3]
		};
	} catch (error) {
		console.error(error);
	}
};

export const parseOrderInfoFromHtml = HTMLCollection => {
	const dataOrders = HTMLCollection.map(getTextsFromHtmlOrderElement);

	const filteredOrders = dataOrders.map(convertParsedOrderInfoToObject);

	return filteredOrders;
};
