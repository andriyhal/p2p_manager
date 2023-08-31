const existingTasks = JSON.parse(localStorage.getItem('tasksInfo')) || [];

export const saveTasksToQueue = tasks => {
	const updatedTasks = existingTasks.concat(tasks);
	localStorage.setItem('tasksInfo', JSON.stringify(updatedTasks));
};

export const getQueueTasksLength = () =>
	JSON.parse(localStorage.getItem('tasksInfo')) || [];

export const processNextTask = () => {
	const queuedTasks = JSON.parse(localStorage.getItem('tasksInfo')) || [];

	if (queuedTasks.length > 0) {
		const nextTask = queuedTasks.shift();
		queuedTasks.push(nextTask);

		localStorage.setItem('tasksInfo', JSON.stringify(queuedTasks));

		return nextTask;
	}

	return;
};
