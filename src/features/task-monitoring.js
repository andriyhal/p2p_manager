import { getCurrentPath } from '../dom-scraper';
import BinanceP2PMonitor from './binance_p2p_monitor';
import { getQueueTasksLength, processNextTask } from './queuq-tasks';

const binanceP2PMonitor = new BinanceP2PMonitor();
export const checkOrStartTaskMonitoring = () => {
	if (getCurrentPath() !== 'advEdit') {
		const task = processNextTask();

		if (task && !binanceP2PMonitor.waitFor.terminate) {
			binanceP2PMonitor.initializeOrderInfo(task);
			binanceP2PMonitor.startMonitoring();
			console.log('start');
		}
	}
};

export const checkOrStopTaskMonitoring = () => {
	if (!getQueueTasksLength().length) {
		binanceP2PMonitor.stopMonitoring();
		console.log('stop');
	}
};
