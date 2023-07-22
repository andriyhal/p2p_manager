import React, { useState } from 'react';
import P2PTaskList from '../P2PTaskList';
import Button from '../../shared/ui/Button';
import Modal from '../../features/Modal';

import { p2p_tracker_container } from './p2p-tracker.module.css';

const P2pTracker = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [items, setItems] = useState([]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDelete = (index) => {
        setItems((prevTaskList) => {
            const deletedTask = prevTaskList[index];

            // deletedTask.monitor.stopMonitoring();

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

    const addItem = (newItem) => {
        console.log(newItem);
        setItems((prevItems) => [...prevItems, newItem]);
    };

    return (
        <div className={p2p_tracker_container}>
            <P2PTaskList tasks={items} onDelete={handleDelete} />
            <Button label="Добавить" onClick={openModal} />
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onAddTask={addItem}
                />
            )}
        </div>
    );
};

export default P2pTracker;
