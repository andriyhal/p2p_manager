import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import runOnWindowLoad from "../shared/lib/run-on-window-load";

runOnWindowLoad(() => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "START_BOT") {
      setTimeout(() => {
        chrome.runtime.sendMessage(
          {
            action: "CLOSE_WINDOW",
            type: "CONTENT",
            tasks: JSON.parse(localStorage.getItem("tasksInfo")) || [],
            windowId: request.windowId,
          },
          (response) => console.log(response)
        );
      }, 3000);
    }
  });

  const newElement = document.createElement("div");
  const bodyElement = document.getElementsByTagName("body")[0];

  newElement.id = "root";
  bodyElement.insertBefore(newElement, bodyElement.firstChild);

  const root = createRoot(document.getElementById("root"));
  root.render(<App />);
});
