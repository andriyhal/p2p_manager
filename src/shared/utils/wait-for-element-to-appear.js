export async function waitForElementsToAppear(selector, count) {
	function waitForElement(selector) {
		return new Promise(resolve => {
			const observer = new MutationObserver((mutationsList, observer) => {
				const element = document.querySelector(selector);
				if (element) {
					observer.disconnect();
					resolve(element);
				}
			});

			observer.observe(document.body, { childList: true, subtree: true });
			const element = document.querySelector(selector);
			if (element) {
				observer.disconnect();
				resolve(element);
			}
		});
	}

	const elements = [];
	for (let i = 0; i < count; i++) {
		const element = await waitForElement(selector);
		elements.push(element);
	}

	return elements;
}
