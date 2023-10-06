import React from 'react';
import { useAddCreateTaskForm } from '../features/use-add-create-task-form';
import LocalStorageManager from '../shared/lib/local-storage-manager';
import { postOrder } from '../features/edit-order-price';
import { getCurrentPath } from '../shared/lib/dom-scraper';
import { scanP2pOrders } from '../features/scan-p2p-orders';
import { unlockOrder } from '../shared/lib/order-locker';
import {
	EDIT_PRICE_STORAGE_KEY,
	TASKS_INFO_STORAGE_KEY
} from '../shared/config';
import { delayedTaskRunner } from '../shared/lib/delayed-task-runner';
import { OrderUpdateCounter } from '../features/OrderEditor';

const editPrice = new LocalStorageManager(EDIT_PRICE_STORAGE_KEY);

const tasksInfo = new LocalStorageManager(TASKS_INFO_STORAGE_KEY);
tasksInfo.saveData(tasksInfo.readData() ? tasksInfo.readData() : []);

const App = () => {
	const taskRunner = delayedTaskRunner(1000);
	const init = async () => {
		const result = await useAddCreateTaskForm();

		if (result) {
			taskRunner.start(scanP2pOrders);
		}
	};

	switch (getCurrentPath()) {
		case 'advEdit':
			editPrice.readData() && postOrder();
			break;
		case 'myads':
			init();
			break;
		default:
			console.log('No matching path found');
			break;
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
