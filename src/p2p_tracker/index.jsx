import React from 'react';
import P2PTaskList from './P2PTaskList';
import Button from '../../shared/ui/Button';
import Modal from '../../features/Modal';
import useP2PMonitor from './useP2PMonitor';

import { p2p_tracker_container } from './p2p-tracker.module.css';

const P2pTracker = () => {
    const {
        isModalOpen,
        tasks,
        openModal,
        closeModal,
        handleDelete,
        handleAddTaskAndParams,
    } = useP2PMonitor();

    return (
        <div className={p2p_tracker_container}>
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
