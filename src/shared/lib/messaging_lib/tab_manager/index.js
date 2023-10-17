class TabManager {
	static openTab(url) {
		return new Promise(resolve => {
			chrome.tabs.create({ url }, tab => {
				resolve(tab);
			});
		});
	}

	static closeTab(tabId) {
		chrome.tabs.remove(tabId);
	}
}

export default TabManager;
