import { Tasks } from "./data/tasks_info";
import { scanP2pOrders } from "./scan_p2p_orders";
import { delayedTaskRunner } from "../shared/lib/delayed-task-runner";
const runner = delayedTaskRunner(1000);
let actionStatusBot = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "START_BOT") {
    actionStatusBot = true;

    sendResponse({
      result: "Start monitoring",
      actionStatusBot,
    });
    runner.start(scanP2pOrders);
  }

  if (message.action === "STOP_BOT") {
    actionStatusBot = false;

    sendResponse({
      result: "Stop monitoring",
      actionStatusBot,
    });
    runner.stop();
  }

  if (message.action === "ADD_TASK") {
    Tasks.addTask(message.task);
    sendResponse({
      result: "Task add in background script",
      tasks: Tasks.getList(),
    });
  }

  if (message.action === "CLOSE_WINDOW") {
    setTimeout(() => {
      if (message.tasks) {
        console.log(message.tasks);
        for (const task of message.tasks) {
          Tasks.addTask(task);
        }
      }

      Tasks.setStatusUpdatePrice(false);

      console.log(`Close window,`, message);
      chrome.windows.remove(message.windowId);
    }, 1000);
  }

  if (message.action === "DELETE_TASK") {
    Tasks.deleteTask(message.taskId);

    sendResponse({
      result: "Task deleted in background script",
      tasks: Tasks.getList(),
    });
  }

  if (message.action === "STATUS_WORKING") {
    sendResponse({
      result: "Status working",
      actionStatusBot,
    });
  }
});
