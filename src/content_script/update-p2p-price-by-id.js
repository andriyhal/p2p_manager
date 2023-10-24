import { TASKS_INFO_STORAGE_KEY } from "../shared/config";

export const updateP2pPriceById = (id, newAmount) => {
  const tasks = JSON.parse(localStorage.getItem(TASKS_INFO_STORAGE_KEY)) || [];

  const updatedTasks = tasks.map((task) => {
    if (task.id === id) {
      return {
        ...task,
        p2pPrice: newAmount,
      };
    }
    return task;
  });

  localStorage.setItem(TASKS_INFO_STORAGE_KEY, JSON.stringify(updatedTasks));
};
