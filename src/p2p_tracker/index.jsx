import React from 'react';
import {P2PTasks} from '../p2p_tasks';

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
