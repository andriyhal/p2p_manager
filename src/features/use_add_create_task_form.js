import React from 'react';
import { createRoot } from 'react-dom/client';
import { P2PTrackerForm } from '../p2p_tracker_form';
import { parseOrderInfoFromHtml } from './save_order_ids_to_locale_storage';
import { getOrders } from './get_orders';

export const useAddCreateTaskForm = () => {
    getOrders().then(orders => {
        [...orders].forEach((order, index) => {
               
            const taskControlForm = document.createElement('div');
            order.appendChild(taskControlForm);
            const root = createRoot(taskControlForm);
            root.render(<P2PTrackerForm {...parseOrderInfoFromHtml(order)}/>);
        });
    });
}