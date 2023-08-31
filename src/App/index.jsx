import React from 'react';
import { useAddCreateTaskForm } from '../features/use_add_create_task_form';
import LocalStorageManager from '../utils/local-storage-manager';
import BinanceP2PMonitor from '../features/binance_p2p_monitor';
import { postOrder } from '../features/create-price-editor';
import { getCurrentPath } from '../dom-scraper';
import { processNextTask } from '../features/queuq-tasks';
import { checkOrStartTaskMonitoring } from '../features/task-monitoring';

const priceData = new LocalStorageManager('priceData');

const tasksInfo = new LocalStorageManager('tasksInfo');
tasksInfo.saveData(tasksInfo.readData() ? tasksInfo.readData() : []);

const App = () => {
	if (getCurrentPath() === 'advEdit' && !!priceData.readData()) {
		postOrder();
	}

	checkOrStartTaskMonitoring();

	useAddCreateTaskForm();

	return <div></div>;
};

export default App;
