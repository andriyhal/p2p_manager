import React from 'react';
import { useAddCreateTaskForm } from '../features/use-add-create-task-form';
import LocalStorageManager from '../shared/lib/local-storage-manager';
import { postOrder } from '../features/edit-order-price';
import { getCurrentPath } from '../shared/lib/dom-scraper';
import { p2pMonitoring } from '../features/scan-p2p-orders';
import { unlockOrder } from '../shared/lib/order-locker';

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

	return <div></div>;
};

export default App;
