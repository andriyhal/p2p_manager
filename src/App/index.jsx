import React from 'react';
import { useAddCreateTaskForm } from '../features/use_add_create_task_form';
import { WaitFor } from '../utils/wait-for';
import LocalStorageManager from '../utils/local-storage-manager';
import BinanceP2PMonitor from '../features/binance_p2p_monitor';
import { postOrder } from '../features/create-price-editor';
import { getCurrentPath } from '../dom-scraper';
import { processNextTask } from '../features/queuq-tasks';

const priceData = new LocalStorageManager('priceData');

const tasksInfo = new LocalStorageManager('tasksInfo');
tasksInfo.saveData(tasksInfo.readData() ? tasksInfo.readData() : []);

const monitorTaskList = new WaitFor(1000);

const queue = new WaitFor(50000);

const App = () => {
	// fetchAllOrdersAndUpdateLocalStorage();
	if (getCurrentPath() === 'advEdit' && !!priceData.readData()) {
		postOrder();
	}

	if (getCurrentPath() !== 'advEdit') {
		const task = processNextTask();

		console.log('queue: ', task);
		if (task) {
			const binanceP2PMonitor = new BinanceP2PMonitor(task);
			binanceP2PMonitor.startMonitoring();
		}
	}

	useAddCreateTaskForm();

	return <div></div>;
};

export default App;
