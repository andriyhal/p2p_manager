import React from 'react';
<<<<<<< HEAD
import P2PTaskList from './P2PTaskList';
import Button from '../../shared/ui/Button';
import Modal from '../../features/Modal';
import useP2PMonitor from './useP2PMonitor';
=======
import {P2PTasks} from '../p2p_tasks';
>>>>>>> 57b4bef13facb922a1994a192a6c297290157dd3

import {P2PTrackerForm} from "../p2p_tracker_form";
import useP2PMonitor from "../shared/hooks/useP2PMonitor";

export const P2PTracker = () => {
    const {
        isModalOpen,
        tasks,
        openModal,
        closeModal,
        handleDelete,
        handleAddTaskAndParams,
    } = useP2PMonitor();

    return (
        <div>
            <P2PTrackerForm
                onAddTask={handleAddTaskAndParams}
            />
            <P2PTasks tasks={tasks} onDelete={handleDelete}/>
        </div>
    );
};
