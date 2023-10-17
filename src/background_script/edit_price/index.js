export const editPrice = (id, newPrice, action) => {
	const url = 'https://p2p.binance.com/en/advEdit?code=' + id;

	chrome.windows.create({ url, type: 'popup' }, window => {
		const tab = window.tabs[0];

		chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
			if (tabId === tab.id && changeInfo.status === 'complete') {
				chrome.tabs.onUpdated.removeListener(listener);
				chrome.tabs.sendMessage(tabId, {
					action,
					type: 'BACKGROUND',
					newPrice,
					windowId: window.id
				});
			}
		});
	});
};
