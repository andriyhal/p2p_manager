import React from 'react';
import { createRoot } from 'react-dom/client';
import { OrderTrackerForm } from './track-order';
import {
	parseElementOrder
} from '../shared/lib/dom-scraper';
import { waitForElement } from '../../test/findElementByTraversal';

export const useAddCreateTaskForm = async () => {
	const traversalPath = [
		{ type: 'parent' },
		{ type: 'parent' },
		{ type: 'parent' },
		{ type: 'parent' },
		{ type: 'parent' },
		{ type: 'child', index: 1 },
		{ type: 'child', index: 0 },
		{ type: 'child', index: 0 }
	];

	const startElement = document.getElementById('c2c_batchOperation_checkbox_selectAll');

	const htmlElement = await waitForElement(
		startElement,
		traversalPath,
		20000
	);

	const todo = await waitForElement(
		htmlElement,
		[{type: 'child', index: 2}],
		20000
	);

	console.log(todo);

	[...todos.children].forEach(order => {
		const isOrder = !order.querySelector('input[data-bn-type="checkbox"]');
		
		if (isOrder) {
			return;
		}

		// const taskControlForm = document.createElement('div');
		// order.appendChild(taskControlForm);
		// const root = createRoot(taskControlForm);
		// root.render(<OrderTrackerForm orderId={orderId} />);
	});

	// getOrderList().then(orders => {
	// 	[...orders].forEach(order => {
	// 		const hasId = !!document.getElementById(order.orderId);
	// 		if (hasId) {
	// 			return;
	// 		}
	// 		const orderId = convertParsedOrderInfoToObject(
	// 			getTextsFromHtmlOrderElement(order)
	// 		);
	// 		const taskControlForm = document.createElement('div');
	// 		order.appendChild(taskControlForm);
	// 		const root = createRoot(taskControlForm);
	// 		root.render(<OrderTrackerForm orderId={orderId} />);
	// 	});
	// });
};
