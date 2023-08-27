import LocalStorageManager from '../utils/local-storage-manager';

function useTaskLocalStorage() {
	const tasksInfo = new LocalStorageManager('tasksInfo');

	const storeTaskAndUpdateIfExists = data => {
		const existingIndex = tasksInfo
			.readData()
			.findIndex(task => task.orderId === data.orderId);

		if (existingIndex === -1) {
			tasksInfo.saveData([...tasksInfo.readData(), data]);
		} else {
			tasksInfo.saveData(
				tasksInfo.readData().map(item =>
					item.orderId === data.orderId
						? {
								...item,
								priceThreshold: data.priceThreshold,
								targetOrderAmount: data.targetOrderAmount
						  }
						: item
				)
			);
		}
	};

	const isTaskStored = orderId => {
		const storedTasks = tasksInfo.readData() || [];
		return !!storedTasks.find(task => task.orderId === orderId);
	};

	return {
		storeTaskAndUpdateIfExists,
		isTaskStored
	};
}

export default useTaskLocalStorage;
