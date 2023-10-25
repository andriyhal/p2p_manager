class MessageListener {
	static addListenerForBackground(callback) {
		chrome.runtime.onMessage.addListener(callback);
	}

	static addListenerForContent(callback) {
		chrome.runtime.onMessage.addListener(callback);
	}
}

export default MessageListener;
