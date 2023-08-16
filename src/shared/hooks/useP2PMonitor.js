import { useState } from "react";
import BinanceP2PMonitor from "../utils/binance_p2p_monitor";
import LocalStorageManager from "../utils/local-storage-manager";

const paramsLocalStorageKey = "paramsP2PRequest";
const localStorageManager = new LocalStorageManager(paramsLocalStorageKey);
export const useP2PMonitor = () => {
  const [tasks, setTasks] = useState(localStorageManager.readData() ? localStorageManager.readData() : []);
  

  try {
    tasks.map(task => {
      const binanceMonitor = new BinanceP2PMonitor(
        task.orderId,
        task.fiat,
        task.tradeType,
        task.asset,
        task.minPrice
      );
      binanceMonitor.startMonitoring();
    });
      
  } catch (error) {
    console.console.error(error);
  }

  const createMonitorInstance = (param) => {
    tasks.map(task => {
      const binanceMonitor = new BinanceP2PMonitor(
        task.orderId,
        task.fiat,
        task.tradeType,
        task.asset,
        task.minPrice
      );
      
      try {
        const prevParam = localStorageManager.readData();
        if (prevParam) {
          localStorageManager.saveData([...prevParam, param]);
        } else localStorageManager.saveData([param]);
      } catch (error) {
        console.log(
          "tasks", localStorageManager.readData()
        );
      }
  
      binanceMonitor.startMonitoring();
    });

   
  };

  const handleDelete = (index) => {
    setTasks((prevTasks) => {
      const taskToRemove = prevTasks[index];
      if (taskToRemove && taskToRemove.monitor) {
        taskToRemove.monitor.stopMonitoring();
      }

      const params = localStorageManager.readData();
      localStorageManager.saveData(JSON.parse(params).splice(index, 1));

      const updatedTasks = [...prevTasks];
      updatedTasks.splice(index, 1);
      return updatedTasks;
    });
  };

  const handleAddTaskAndParams = (newTask) => {
    createMonitorInstance(newTask);
  };

  return {
    tasks,
    handleDelete,
    handleAddTaskAndParams,
  };
};
