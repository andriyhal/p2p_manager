import { waitForElement } from '../dom-scraper';

export const observeElementMutations = async (
	startElement,
	traversalPath,
	observerOptions,
	callback
) => {
	const elementLoader = await waitForElement(startElement, traversalPath);
	const observer = new MutationObserver(callback);

	observer.observe(elementLoader, observerOptions);
};
