class WindowManager {
	static openWindow(url, config = {}) {
		return new Promise(resolve => {
			chrome.windows.create({ url, ...config }, window => {
				resolve(window);
			});
		});
	}

	static closeWindow(windowId) {
		chrome.windows.remove(windowId);
	}
}

export default WindowManager;
