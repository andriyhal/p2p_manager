export const saveTasksToQueue = tasks => {
	const existingTasks = JSON.parse(localStorage.getItem('tasksInfo')) || [];
	const updatedTasks = existingTasks.concat(tasks);

	localStorage.setItem('tasksInfo', JSON.stringify(updatedTasks));
};

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
