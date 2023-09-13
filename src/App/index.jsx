import React from 'react';
import { useAddCreateTaskForm } from '../features/use_add_create_task_form';
import LocalStorageManager from '../utils/local-storage-manager';
import { postOrder } from '../features/create-price-editor';
import { getCurrentPath } from '../dom-scraper';
import { p2pMonitoring } from '../features/p2p-monitoring';
import { unlockOrder } from '../utils/order-locker';

const priceData = new LocalStorageManager('priceData');

const tasksInfo = new LocalStorageManager('tasksInfo');
tasksInfo.saveData(tasksInfo.readData() ? tasksInfo.readData() : []);

const App = () => {
	if (getCurrentPath() === 'advEdit' && !!priceData.readData()) {
		postOrder();
	}

	if (getCurrentPath() === 'myads' && !priceData.readData()) {
		useAddCreateTaskForm();
		p2pMonitoring();
	}

	unlockOrder();

	return (
		<div>
			
		</div>
	);
};

export default App;
