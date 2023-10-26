import { getTasks } from './get_tasks';
import { Tasks } from './data/tasks_info';
import { scanP2pOrders } from './scan_p2p_orders';
import { delayedTaskRunner } from '../shared/lib/delayed-task-runner';
const runner = delayedTaskRunner(1000);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'START_BOT') {
		getTasks(message.action);
		runner.start(scanP2pOrders);
	}

	if (message.action === 'STOP_BOT') {
		runner.stop();
	}

	if (message.action === 'UPDATE_TASKSINFO') {
		getTasks(message.action);
	}

	if (message.action === 'CLOSE_WINDOW') {
		setTimeout(() => {
			if (message.tasks) {
				console.log(message.tasks);
				for (const task of message.tasks) {
					Tasks.addTask(task);
				}
			}

			Tasks.setStatusUpdatePrice(false);

			console.log(`Close window,`, message);
			chrome.windows.remove(message.windowId);
		}, 1000);
	}
});
