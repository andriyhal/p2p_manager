import React from 'react';

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
