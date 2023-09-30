import React from 'react';
import { createRoot } from 'react-dom/client';
import { OrderTrackerForm } from './track-order';
import {
	convertParsedOrderInfoToObject,
	getCurrentPath,
	getOrderList,
	getTextsFromHtmlOrderElement
} from '../shared/lib/dom-scraper';
import { waitForElement } from '../../test/waitForElement';

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

	const todos = await waitForElement(
		'c2c_batchOperation_checkbox_selectAll',
		traversalPath,
		20000
	);
	console.log(todos);

	// for (const iterator of todos.children) {
	// 	console.log(iterator);
	// }

	[...todos.children].forEach(order => {
		const hasId = !!document.getElementById(order.orderId);

		if (hasId) {
			return;
		}
		const orderId = convertParsedOrderInfoToObject(
			getTextsFromHtmlOrderElement(order)
		);
		const taskControlForm = document.createElement('div');
		order.appendChild(taskControlForm);
		const root = createRoot(taskControlForm);
		root.render(<OrderTrackerForm orderId={orderId} />);
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
