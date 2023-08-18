import React from 'react';
import { createRoot } from 'react-dom/client';
import { P2PTrackerForm } from '../p2p_tracker_form';
import { getOrderList, parseOrderInfoFromHtml } from '../dom-helpers';

export const useAddCreateTaskForm = () => {
    getOrderList().then(orders => {
        [...orders].forEach((order) => {

            const hasId = !!document.getElementById(order.orderId);

            if(hasId) {
                return;
            }
               
            const taskControlForm = document.createElement('div');
            order.appendChild(taskControlForm);
            const root = createRoot(taskControlForm);
            root.render(<P2PTrackerForm {...parseOrderInfoFromHtml(order)}/>);
        });
    });
}