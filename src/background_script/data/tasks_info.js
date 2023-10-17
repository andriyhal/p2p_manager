const tasksInfo = [];

export class Tasks {
	static currentIndex = 0; // переменная для отслеживания текущего индекса

	static getList() {
		return tasksInfo;
	}

	static addTask(item) {
		if (!item || !item.id) {
			throw new Error('Task is missing an id');
		}

		const index = tasksInfo.findIndex(task => task.id === item.id);

		if (index !== -1) {
			tasksInfo[index] = item;
		} else {
			tasksInfo.push(item);
		}
	}

	static deleteTask(id) {
		if (!id) {
			throw new Error('An id must be provided');
		}

		const index = tasksInfo.findIndex(task => task.id === id);
		if (index !== -1) {
			tasksInfo.splice(index, 1);
		} else {
			throw new Error('No task found with the provided id');
		}
	}

	static getNextTask() {
		if (tasksInfo.length === 0) {
			throw new Error('No tasks available');
		}

		const task = tasksInfo[Tasks.currentIndex];
		Tasks.currentIndex = (Tasks.currentIndex + 1) % tasksInfo.length;

		return task;
	}
}
