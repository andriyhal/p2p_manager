import { getTasks } from './get_tasks';
import { Tasks } from './data/tasks_info';
import { scanP2pOrders } from './scan-p2p-orders';
import { delayedTaskRunner } from '../shared/lib/delayed-task-runner';
const runner = delayedTaskRunner(1000);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'START_BOT') {
		runner.start(scanP2pOrders);
		sendResponse({ action: 'STOP_BOT' });
		getTasks(message.action);
	}

	if (message.action === 'STOP_BOT') {
		runner.stop();
		sendResponse({ action: 'START_BOT' });
	}

	if (message.action === 'UPDATE_TASKSINFO') {
		getTasks(message.action);
	}

	if (message.action === 'CLOSE_WINDOW') {
		if (message.tasks) {
			for (const task of message.tasks) {
				Tasks.addTask(task);
			}
		}
		console.log(Tasks.getList());
		chrome.windows.remove(message.windowId);
	}
});
