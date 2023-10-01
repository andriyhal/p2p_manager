import { WaitFor } from '../wait-for';

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

export const parseAndValidateOrderData = (idAndAction, amountAndCurrency, banks) => {
    const [id, actionString, pairString] = idAndAction.split('\n');

    let action = actionString.trim().toUpperCase();
    if (['КУПІВЛЯ', 'ПОКУПКА', 'BUY'].includes(action)) {
        action = 'BUY';
    } else if (['ПРОДАЖ', 'ПРОДАТЬ', 'SELL'].includes(action)) {
        action = 'SELL';
    } else {
        throw new Error('Unknown action');
    }

	const [asset, fiat] = pairString.split('/').map(s => s.trim());

    const amountString = amountAndCurrency.replace(/[^0-9.]/g, ''); 
    const amount = parseFloat(amountString);

    const banksArray = banks.split(',').map(bank => bank.trim());

    return {
        id: id.trim(),
        action: action,
        pair: {
			fiat,
			asset
		},
        amount: amount,
        banks: banksArray
    };
}
  
const waitForChildElement = (parent, index, timeout = 3000) => {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const intervalId = setInterval(() => {
            if (Date.now() - startTime > timeout) {
                clearInterval(intervalId);
                reject(new Error('Timeout waiting for child element'));
            }

            if (parent.children && parent.children.length > index) {
                clearInterval(intervalId);
                resolve(parent.children[index]);
            }
        }, 100);
    });
}

export const waitForElement = async (startElement, traversalPath, timeout = 30000) => {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();

        const intervalId = setInterval(async () => {
            if (Date.now() - startTime > timeout) {
                clearInterval(intervalId);
                reject(new Error('Timeout reached when waiting for element'));
                return;
            }

            if (startElement) {
                clearInterval(intervalId);
                let currentElement = startElement;

                try {
                    for (const step of traversalPath) {
                        if (!currentElement) {
                            throw new Error('Current element is null during traversal');
                        }
                        
                        if (step.type === 'parent') {
                            currentElement = currentElement.parentElement;
                        } else if (step.type === 'child') {
                            currentElement = await waitForChildElement(currentElement, step.index);
                        } // Add more traversal types as needed
                    }

                    if (currentElement) {
                        resolve(currentElement);
                    } else {
                        throw new Error('Traversal path leads to a null element');
                    }
                } catch (error) {
                    reject(error);
                }
            }
        }, 100);
    });
}
