class MessageSender {
	static sendMessageToBackground(data, callback) {
		chrome.runtime.sendMessage(data, callback);
	}

	static sendMessageToContent(tabId, data, callback) {
		chrome.tabs.sendMessage(tabId, data, callback);
	}
}

export default MessageSender;
