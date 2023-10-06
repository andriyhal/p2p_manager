import { TASKS_INFO_STORAGE_KEY } from '../../config';

const existingTasks =
	JSON.parse(localStorage.getItem(TASKS_INFO_STORAGE_KEY)) || [];

export const saveTasksToQueue = tasks => {
	const updatedTasks = existingTasks.concat(tasks);
	localStorage.setItem(TASKS_INFO_STORAGE_KEY, JSON.stringify(updatedTasks));
};

export const processNextTask = () => {
	const queuedTasks =
		JSON.parse(localStorage.getItem(TASKS_INFO_STORAGE_KEY)) || [];

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
