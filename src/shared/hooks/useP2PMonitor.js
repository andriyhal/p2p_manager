import { useState } from 'react';
import BinanceP2PMonitor from '../utils/BinanceP2PMonitor';
import LocalStorageManager from '../utils/local-storage-manager';

const paramsLocalStorageKey = 'paramsP2PRequest';

const useP2PMonitor = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const localStorageManager = new LocalStorageManager(paramsLocalStorageKey);

    const storedParams = localStorageManager.readData();
    if (!storedParams) {
        localStorageManager.saveData([]);
    }

    const createMonitorInstance = (param) => {
        const binanceMonitor = new BinanceP2PMonitor(
            param.nickName,
            param.fiat,
            param.tradeType,
            param.asset,
        );

        try {
            const prevParam = JSON.parse(localStorageManager.readData());
            if (prevParam && prevParam.length) {
                localStorageManager.saveData([...prevParam, param]);
            }
        } catch (error) {
            console.log(
                'localStorageManager.readData()',
                localStorageManager.readData(),
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

    return {
        isModalOpen,
        tasks,
        openModal,
        closeModal,
        handleDelete,
        handleAddTaskAndParams,
    };
};

export default useP2PMonitor;
