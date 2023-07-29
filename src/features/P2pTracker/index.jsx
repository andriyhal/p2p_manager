import React, { useEffect, useState } from 'react';
import P2PTaskList from '../P2PTaskList';
import Button from '../../shared/ui/Button';
import Modal from '../../features/Modal';

import BinanceP2PMonitor from '../../shared/utils/BinanceP2PMonitor';
import LocalStorageManager from '../../shared/utils/local-storage-manager';

// import { p2p_tracker_container } from './p2p-tracker.module.css';

const paramsLocalStorageKey = 'paramsP2PRequest';

const P2pTracker = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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
            <P2PTaskList tasks={tasks} onDelete={handleDelete} />
            <Button label="Добавить" onClick={openModal} />
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onAddTask={handleAddTaskAndParams}
                />
            )}
        </div>
    );
};

export default P2pTracker;
