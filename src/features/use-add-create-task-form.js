import React from 'react';
import { createRoot } from 'react-dom/client';
import { P2PTrackerForm } from '../p2p-tracker-form';
import {
	convertParsedOrderInfoToObject,
	getCurrentPath,
	getOrderList,
	getTextsFromHtmlOrderElement
} from '../dom-scraper';

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
				root.render(<P2PTrackerForm orderId={orderId} />);
			});
		});
	}
};
