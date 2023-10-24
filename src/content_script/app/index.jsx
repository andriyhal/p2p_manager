import React from "react";
import { useAddCreateTaskForm } from "../use-add-create-task-form";
import { postOrder } from "../edit-order-price";
import { getCurrentPath } from "../../shared/lib/dom-scraper";
import { unlockOrder } from "../../shared/lib/order-locker";
import { delayedTaskRunner } from "../../shared/lib/delayed-task-runner";
import { OrderUpdateCounter } from "../OrderUpdateCounter";
import { updateP2pPriceById } from "../update-p2p-price-by-id";

const App = () => {
  const taskRunner = delayedTaskRunner(1000);

  const init = async () => {
    const result = await useAddCreateTaskForm();
    if (result) {
      chrome.runtime.sendMessage({ action: "startBot" });
    }
  };

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "EDIT_PRICE") {
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
