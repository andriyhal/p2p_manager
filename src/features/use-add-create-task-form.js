import React from 'react';
import { createRoot } from 'react-dom/client';
import { OrderTrackerForm } from './track-order';
import {
	convertParsedOrderInfoToObject,
	getCurrentPath,
	getOrderList,
	getTextsFromHtmlOrderElement
} from '../shared/lib/dom-scraper';

export const useAddCreateTaskForm = () => {
	if (getCurrentPath() === 'myads') {
		getOrderList().then(orders => {
			[...orders].forEach(order => {
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
		});
	}
};
