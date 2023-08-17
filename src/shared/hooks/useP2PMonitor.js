import { useEffect, useState } from "react";
import BinanceP2PMonitor from "../utils/binance_p2p_monitor";
import LocalStorageManager from "../utils/local-storage-manager";


const tasksInfo = new LocalStorageManager("tasksInfo");
const ordersLocalStorage = new LocalStorageManager('orderInfo');

export const useP2PMonitor = () => {
  const [tasks, setTasks] = useState(tasksInfo.readData() ? tasksInfo.readData() : []);

  useEffect(() => {
    tasks.map(task => {

      const orders = ordersLocalStorage.readData();
      const [order] = [...orders].filter(order => order.orderId === task.orderId);
      
      if (order) {
        const binanceMonitor = new BinanceP2PMonitor(order, task.minPrice);
        binanceMonitor.startMonitoring();
      }
    });
    console.log('ffffffffffff');
  }, [tasks]);

  const createMonitorInstance = ({data, infoOrder}) => {
    const binanceMonitor = new BinanceP2PMonitor(infoOrder, data.minPrice);
      
    if (tasksInfo.readData()) {
      const [newTask] = tasksInfo.readData().filter(task => task.orderId === infoOrder.orderId);
      tasksInfo.saveData([...tasksInfo.readData(), newTask.orderId, data.minPrice]);
      return
    }
      
    tasksInfo.saveData([infoOrder.orderId, data.minPrice]);
    binanceMonitor.startMonitoring();
    return
  };

  const handleDelete = (index) => {
    setTasks((prevTasks) => {
      const taskToRemove = prevTasks[index];
      if (taskToRemove && taskToRemove.monitor) {
        taskToRemove.monitor.stopMonitoring();
      }

      const params = taskIds.readData();
      tasksInfo.saveData(JSON.parse(params).splice(index, 1));

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
