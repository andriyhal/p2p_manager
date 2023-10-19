import { getBankId } from './bankNameMapper';

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

export const parseAndValidateOrderData = (
	idAndAction,
	amountAndCurrency,
	banks
) => {
	const [id, actionString, pairString] = idAndAction.split('\n');

	let action = actionString.trim().toUpperCase();
	if (['КУПІВЛЯ', 'КУПИТЬ', 'BUY'].includes(action)) {
		action = 'SELL';
	} else if (['ПРОДАЖ', 'ПРОДАТЬ', 'SELL'].includes(action)) {
		action = 'BUY';
	} else {
		throw new Error('Unknown action');
	}

	const [asset, fiat] = pairString.split('/').map(s => s.trim());

	const amountString = amountAndCurrency.replace(/[^0-9.]/g, '');
	const amount = parseFloat(amountString);

	const banksArray = banks
		.split('\n')
		.map(bank => bank.trim())
		.filter(bank => {
			if (getBankId(bank)) {
				return getBankId(bank);
			} else return;
		});

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
};

export const findButtonByText = (textArray, timeout = 5000, interval = 100) => {
	return new Promise((resolve, reject) => {
		const startTime = Date.now();

		const checkButton = () => {
			const buttons = document.querySelectorAll('button');

			for (let button of buttons) {
				for (let text of textArray) {
					if (button.textContent.trim().includes(text.trim())) {
						console.log('Button found:', button);
						resolve(button);
						return;
					}
				}
			}

			if (Date.now() - startTime > timeout) {
				console.log('Button not found');
				reject(new Error('Timeout exceeded'));
				return;
			}

			setTimeout(checkButton, interval);
		};

		checkButton();
	});
};

export const findDeepestElementsByText = (
	selector,
	textArray,
	timeout = 5000,
	interval = 100,
	caseSensitive = false
  ) => {
	return new Promise((resolve, reject) => {
	  const startTime = Date.now();
  
	  const checkElement = () => {
		const elements = document.querySelectorAll(selector);
		let foundElements = [];
  
		for (let element of elements) {
		  for (let text of textArray) {
			const elementText = caseSensitive
			  ? element.textContent.trim()
			  : element.textContent.trim().toLowerCase();
			const searchText = caseSensitive
			  ? text.trim()
			  : text.trim().toLowerCase();
  
			if (elementText.includes(searchText)) {
			  let childHasSameText = Array.from(element.children).some(child => {
				const childText = caseSensitive
				  ? child.textContent.trim()
				  : child.textContent.trim().toLowerCase();
				return childText.includes(searchText);
			  });
  
			  if (!childHasSameText) {
				foundElements.push(element);
			  }
			}
		  }
		}
  
		if (foundElements.length > 0 || Date.now() - startTime > timeout) {
		  if (foundElements.length > 0) {
			console.log('Elements found:', foundElements);
			resolve(foundElements);
		  } else {
			console.log('No elements found');
			reject(new Error('Timeout exceeded'));
		  }
		  return;
		}
  
		setTimeout(checkElement, interval);
	  };
  
	  checkElement();
	});
  };

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
};

export const waitForElement = async (
	startElement,
	traversalPath,
	timeout = 30000
) => {
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
							throw new Error(
								'Current element is null during traversal'
							);
						}

						if (step.type === 'parent') {
							currentElement = currentElement.parentElement;
						} else if (step.type === 'child') {
							currentElement = await waitForChildElement(
								currentElement,
								step.index
							);
						} // Add more traversal types as needed
					}

					if (currentElement) {
						resolve(currentElement);
					} else {
						throw new Error(
							'Traversal path leads to a null element'
						);
					}
				} catch (error) {
					reject(error);
				}
			}
		}, 100);
	});
};
