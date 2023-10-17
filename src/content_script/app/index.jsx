import React from 'react';
import { useAddCreateTaskForm } from '../use-add-create-task-form';
import { postOrder } from '../edit-order-price';
import { getCurrentPath } from '../../shared/lib/dom-scraper';
import { unlockOrder } from '../../shared/lib/order-locker';
import { delayedTaskRunner } from '../../shared/lib/delayed-task-runner';
import { OrderUpdateCounter } from '../OrderUpdateCounter';

const App = () => {
	const taskRunner = delayedTaskRunner(1000);

	const init = async () => {
		const result = await useAddCreateTaskForm();
		if (result) {
			chrome.runtime.sendMessage({ action: 'startBot' });
		}
	};

	chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
		if (message.action === 'editPrice') {
			postOrder(message.newPrice);

			window.addEventListener('load', function () {
				chrome.runtime.sendMessage({ action: 'closeTab' });
			});
		}
	});

	if (getCurrentPath() === 'myads') {
		init();
	}

	unlockOrder();

	return (
		<div>
			<button onClick={() => taskRunner.stop()}>Stop bot</button>
			<OrderUpdateCounter />
		</div>
	);
};

export default App;
