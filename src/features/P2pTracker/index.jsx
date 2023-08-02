import React from 'react';
import P2PTaskList from '../P2PTaskList';
import Button from '../../shared/ui/Button';
import Modal from '../../features/Modal';
import useP2PMonitor from '../../shared/hooks/useP2PMonitor';

import { p2p_tracker_container } from './p2p-tracker.module.css';
import createPriceEditor from '../create-price-editor';
import runOnWindowLoad from '../../shared/utils/run-on-window-load';

const P2pTracker = () => {
    const {
        isModalOpen,
        tasks,
        openModal,
        closeModal,
        handleDelete,
        handleAddTaskAndParams,
    } = useP2PMonitor();

    const priceEditor = createPriceEditor();

    priceEditor.editPrice(37.93);
    priceEditor.run();

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
