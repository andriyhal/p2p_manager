import React, { useState, useEffect } from 'react';
import BinanceP2PMonitor from '../../shared/utils/BinanceP2PMonitor';

const P2PTaskList = ({ tasks }) => {
  const [taskList, setTaskList] = useState(tasks);

  const handleDelete = (index) => {
    setTaskList((prevTaskList) => {
      const deletedTask = prevTaskList[index];

      deletedTask.monitor.stopMonitoring();

      const updatedTasks = [...prevTaskList];
      updatedTasks.splice(index, 1);
      return updatedTasks;
    });
  };

  useEffect(() => {

    const createMonitorInstance = (task) => {
        const monitor = new BinanceP2PMonitor(
            task.userName,
            task.fiat,
            task.tradeType,
            task.asset,
            task.price
        );

      monitor.startMonitoring();
      return monitor;
    };

    setTaskList((prevTaskList) => {

      const newTasks = prevTaskList.filter((task) => !task.monitor);
      if (newTasks.length > 0) {
        const updatedTasks = [...prevTaskList];
        newTasks.forEach((task) => {
          task.monitor = createMonitorInstance(task);
        });
        return updatedTasks;
      }
      return prevTaskList;
    });
  }, [tasks]);

  return (
    <div>
      {taskList.map((task, index) => (
        <div key={index}>
          <span>{task.userName}</span>
          <span>{task.price}</span>
          <span>{task.side}</span>
          <button onClick={() => handleDelete(index)}>Delete task</button>
        </div>
      ))}
    </div>
  );
};

export default P2PTaskList;