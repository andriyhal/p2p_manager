import React, {useState} from 'react';
import {P2PTasks} from '../p2p_tasks';
import {P2PTrackerForm} from '../p2p_tracker_form';

import BinanceP2PMonitor from '../shared/utils/BinanceP2PMonitor';
import LocalStorageManager from '../shared/utils/local-storage-manager';

// import { p2p_tracker_container } from './p2p-tracker.module.css';

const paramsLocalStorageKey = 'paramsP2PRequest';

export const P2PTracker = () => {
    const [tasks, setTasks] = useState([]);
    const localStorageManager = new LocalStorageManager(paramsLocalStorageKey);

    const storedParams = localStorageManager.readData();
    if (storedParams) {
        localStorageManager.saveData([]);
    }

    const createMonitorInstance = (param) => {
        const binanceMonitor = new BinanceP2PMonitor(
            param.nickName,
            param.fiat,
            param.tradeType,
            param.asset
        );

        try {
            const prevParam = JSON.parse(localStorageManager.readData());
            console.log('prev param: ', prevParam);
            if (prevParam && prevParam.length) {
                localStorageManager.saveData([...prevParam, param]);
            }
        } catch (error) {
            console.log(
                'localStorageManager.readData()',
                localStorageManager.readData()
            );
        }

        binanceMonitor.startMonitoring();

        setTasks((prevTasks) => [...prevTasks, binanceMonitor]);
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

    return (
        <div className={"p2p_tracker_container"}>
            <P2PTrackerForm
                onAddTask={handleAddTaskAndParams}
            />
            <P2PTasks tasks={tasks} onDelete={handleDelete}/>
        </div>
    );
};
