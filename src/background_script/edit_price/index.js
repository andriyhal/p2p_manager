export const editPrice = (id, newPrice, action) => {
  const url = "https://p2p.binance.com/en/advEdit?code=" + id;

  const windowOptions = {
    url,
    type: "popup",
    width: 300,
    height: 500,
    top: 0,
    left: 0,
  };

  chrome.windows.create(windowOptions, (window) => {
    // const tab = window.tabs[0];
    const tab = window.tabs.find((tab) => tab.windowId === window.id);

    chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
      if (tabId === tab.id && changeInfo.status === "complete") {
        chrome.tabs.onUpdated.removeListener(listener);
        chrome.tabs.sendMessage(tabId, {
          action,
          type: "BACKGROUND",
          newPrice,
          id,
          windowId: window.id,
        });
      }
    });
  });
};
