import { TASKS_INFO_STORAGE_KEY } from '../shared/config';

export const deleteTaskById = taskId => {
	const tasksJson = localStorage.getItem(TASKS_INFO_STORAGE_KEY);
	if (!tasksJson) {
		console.error('No tasks found in localStorage');
		return;
	}

	const tasks = JSON.parse(tasksJson);

	const updatedTasks = tasks.filter(task => task.id !== taskId);

	if (tasks.length === updatedTasks.length) {
		console.error(`Task with id ${taskId} not found`);
		return;
	}

	localStorage.setItem(TASKS_INFO_STORAGE_KEY, JSON.stringify(updatedTasks));
	console.log(`Task with id ${taskId} deleted successfully`);
};
