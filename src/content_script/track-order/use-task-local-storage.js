import { TASKS_INFO_STORAGE_KEY } from '../../shared/config';
import LocalStorageManager from '../../shared/lib/local-storage-manager';

export const taskLocalStorage = () => {
	const tasksInfo = new LocalStorageManager(TASKS_INFO_STORAGE_KEY);

	const storeTaskAndUpdateIfExists = data => {
		const existingIndex = tasksInfo
			.readData()
			.findIndex(task => task.id === data.id);

		if (existingIndex === -1) {
			tasksInfo.saveData([...tasksInfo.readData(), data]);
		} else {
			tasksInfo.saveData(
				tasksInfo.readData().map(item =>
					item.id === data.id
						? {
								...item,
								percentage: data.percentage,
								isMerchant: data.isMerchant ? 'merchant' : null,
								beatBy: data.beatBy
						  }
						: item
				)
			);
		}

		return tasksInfo.readData().filter(task => task.id === data.id);
	};

	const isTaskStored = orderId => {
		const storedTasks = tasksInfo.readData() || [];
		return !!storedTasks.find(task => task.id === orderId);
	};

	return {
		storeTaskAndUpdateIfExists,
		isTaskStored
	};
};
