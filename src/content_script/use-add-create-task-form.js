import React from 'react';
import { createRoot } from 'react-dom/client';
import { OrderTrackerForm } from './track-order';
import {
	parseAndValidateOrderData,
	parseElementOrder,
	waitForElement
} from '../shared/lib/dom-scraper';
import { deleteTaskById } from './delete_task_by_id';

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

	try {
		const startElement = document.getElementById(
			'c2c_batchOperation_checkbox_selectAll'
		);

		const htmlElement = await waitForElement(
			startElement,
			traversalPath,
			20000
		);

		const [htmlOrders] = [...htmlElement.children].filter(
			(child, index) => {
				if (index > 0) {
					return child;
				} else return;
			}
		);

		for (const startElement of htmlOrders.children) {
			const htmlColumnsOrder = await waitForElement(
				startElement,
				[{ type: 'child', index: 0 }],
				20000
			);

			if (htmlColumnsOrder.children[0].innerText === '') {
				deleteTaskById(
					parseAndValidateOrderData(
						htmlColumnsOrder.children[1].innerText,
						htmlColumnsOrder.children[3].innerText,
						htmlColumnsOrder.children[4].innerText
					).id
				);
			}

			if (htmlColumnsOrder.children.length < 8) {
				const parsedDataOrder = parseAndValidateOrderData(
					htmlColumnsOrder.children[0].innerText,
					htmlColumnsOrder.children[2].innerText,
					htmlColumnsOrder.children[3].innerText
				);

				const taskControlForm = document.createElement('div');
				htmlColumnsOrder.children[
					htmlColumnsOrder.children.length - 1
				].appendChild(taskControlForm);
				const root = createRoot(taskControlForm);
				root.render(
					<OrderTrackerForm parsedDataOrder={parsedDataOrder} />
				);
			}
		}
	} catch (error) {
		console.log(error);
		return;
	}

	return true;
};
