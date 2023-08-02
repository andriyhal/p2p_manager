<<<<<<< HEAD:src/features/P2PTaskList/index.jsx
import React, { useState } from 'react';
=======
import React from 'react';
>>>>>>> 4c5a6ada573d97ae008f84baf4c820c00296ba17:src/p2p_tasks/index.jsx

export const P2PTasks = ({tasks, onDelete}) => {
    return (
        <div>
            {tasks.map((task, index) => (
                <div key={index}>
                    <span>{task.userName}</span>
                    <span>{task.price}</span>
                    <span>{task.side}</span>
                    <button onClick={() => onDelete(index)}>Delete task</button>
                </div>
            ))}
        </div>
    );
};
