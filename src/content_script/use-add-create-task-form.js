import React from 'react';
import { createRoot } from 'react-dom/client';
import { OrderTrackerForm } from './track-order';
import {
	parseAndValidateOrderData,
	findDeepestElementsByText
} from '../shared/lib/dom-scraper';
import { deleteTaskById } from './delete_task_by_id';
import { getAssetPrice } from '../shared/api/get_asset_price';

export const useAddCreateTaskForm = async () => {
	try {
		const elements = await findDeepestElementsByText('div', ['--']);

		const columnsElementOrder = elements
			.filter(element => {
				if (element.parentElement.parentElement.children.length < 8) {
					return element;
				} else {
					deleteTaskById(
						element.parentElement.parentElement.children[1].innerText.split(
							'\n'
						)[0]
					);
				}
			})
			.map(e => e.parentElement.parentElement);

		for (const e of columnsElementOrder) {
			const parsedDataOrder = parseAndValidateOrderData(
				e.children[0].innerText,
				e.children[2].innerText,
				e.children[3].innerText
			);

			const spotAssetPrice = await getAssetPrice(
				parsedDataOrder.pair.fiat,
				parsedDataOrder.pair.asset
			);

			await new Promise(res => setTimeout(res, 500));

			parsedDataOrder['spotPrice'] = spotAssetPrice;

			const taskControlForm = document.createElement('div');
			e.appendChild(taskControlForm);

			const taskFormId = document.getElementById(parsedDataOrder.id);

			if (!taskFormId) {
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
