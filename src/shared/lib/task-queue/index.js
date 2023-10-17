import { TASKS_INFO_STORAGE_KEY } from '../../config';

export const processNextTask = () => {
	let queuedTasks = [];

	try {
		queuedTasks =
			JSON.parse(localStorage.getItem(TASKS_INFO_STORAGE_KEY)) || [];
	} catch (error) {
		console.error('Error parsing tasks from localStorage:', error);
	}

	if (queuedTasks.length > 0) {
		const nextTask = queuedTasks.shift();
		queuedTasks.push(nextTask);

		localStorage.setItem(
			TASKS_INFO_STORAGE_KEY,
			JSON.stringify(queuedTasks)
		);

		return nextTask;
	}
};
