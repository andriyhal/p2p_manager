let tasksInfo = [];
let currentTask = {};
let statusUpdatePrice = false;

export class Tasks {
  static currentIndex = 0;

  static getList() {
    return tasksInfo;
  }

  static addTask(task) {
    chrome.storage.local.get(["tasksInfo"], (result) => {
      tasksInfo = result.tasksInfo || [];
      const index = tasksInfo.findIndex(
        (existingTask) => existingTask.id === task.id
      );

      if (index !== -1) {
        tasksInfo[index] = task;
      } else {
        tasksInfo.push(task);
      }

      chrome.storage.local.set({ tasksInfo }, () => {
        console.log("Task saved", tasksInfo);
      });
    });
  }

  static deleteTask(id) {
    if (!id) {
      throw new Error("An id must be provided");
    }

    const index = tasksInfo.findIndex((task) => task.id === id);
    if (index !== -1) {
      tasksInfo.splice(index, 1);
    } else {
      throw new Error("No task found with the provided id");
    }

    chrome.storage.local.set({ tasksInfo }, () => {
      console.log("Task deleted", tasksInfo);
    });
  }

  static getNextTask() {
    chrome.storage.local.get(["tasksInfo"], (result) => {
      tasksInfo = result.tasksInfo || [];
    });

    if (tasksInfo.length === 0) {
      console.log("No tasks available");
      return;
    }

    const task = tasksInfo[Tasks.currentIndex];
    Tasks.currentIndex = (Tasks.currentIndex + 1) % tasksInfo.length;

    return task;
  }

  static setStatusUpdatePrice(value = false) {
    statusUpdatePrice = value;
  }

  static getStatusUpdatePrice() {
    return statusUpdatePrice;
  }
}
