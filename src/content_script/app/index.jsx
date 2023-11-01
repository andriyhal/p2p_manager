import React from "react";
import { useAddCreateTaskForm } from "../use-add-create-task-form";
import { postOrder } from "../edit-order-price";
import { getCurrentPath } from "../../shared/lib/dom-scraper";
import { unlockOrder } from "../../shared/lib/order-locker";
import { updateP2pPriceById } from "../update-p2p-price-by-id";

const App = () => {
  const init = async () => {
    const result = await useAddCreateTaskForm();
    if (result) {
      chrome.runtime.sendMessage({ action: "startBot" });
    }
  };

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "EDIT_PRICE") {
      document.title = `Update price [id: ${request.id} new price: ${request.newPrice}]`;

      postOrder(request.newPrice);

      window.addEventListener("beforeunload", (event) => {
        updateP2pPriceById(request.id, request.newPrice);
        chrome.runtime.sendMessage(
          {
            action: "CLOSE_WINDOW",
            type: "CONTENT",
            tasks: JSON.parse(localStorage.getItem("tasksInfo")) || [],
            windowId: request.windowId,
          },
          (response) => console.log(response)
        );
      });
    }
  });

  if (getCurrentPath() === "myads") {
    init();
  }

  unlockOrder();

  return <div></div>;
};

export default App;
