import React, { useState, useEffect } from 'react';
import BinanceP2PMonitor from '../../shared/utils/BinanceP2PMonitor';

const P2PTaskList = ({ tasks, onDelete }) => {
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

export default P2PTaskList;
