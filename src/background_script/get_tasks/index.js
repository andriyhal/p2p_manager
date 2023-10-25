export const getTasks = action => {
	const url = 'https://p2p.binance.com/en/myads?type=normal&code=default';

	chrome.windows.create({ url, type: 'popup' }, window => {
		const tab = window.tabs[0];

		chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
			if (tabId === tab.id && changeInfo.status === 'complete') {
				chrome.tabs.onUpdated.removeListener(listener);
				chrome.tabs.sendMessage(tabId, {
					action,
					type: 'BACKGROUND',
					tabId,
					windowId: window.id
				});
			}
		});
	});
};
