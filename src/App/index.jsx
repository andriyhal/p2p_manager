import React, { useEffect, useState } from "react";
import { saveOrderIdsToLocaleStorage } from "../features/save_order_ids_to_locale_storage";
import { useAddCreateTaskForm } from "../features/use_add_create_task_form";
import { WaitFor } from "../utils/wait-for";
import LocalStorageManager from "../utils/local-storage-manager";
import BinanceP2PMonitor from "../features/binance_p2p_monitor";
import createPriceEditor from "../features/create-price-editor";


const priceData = new LocalStorageManager('priceData');
const { run } = createPriceEditor();

const tasksInfo = new LocalStorageManager('tasksInfo');
tasksInfo.saveData(tasksInfo.readData() ? tasksInfo.readData() : []);
const tasks = tasksInfo.readData().map(task => new BinanceP2PMonitor(task));
tasks.forEach(task => task.startMonitoring());

const monitorTaskList = new WaitFor(1000);

const App = () => {
    const updata = () => {
        if (tasks.length < tasksInfo.readData().length) {
            const task = [...tasksInfo.readData()].pop();
            tasks.push(new BinanceP2PMonitor(task));

            [...tasks].pop().startMonitoring();
        }
    };

    monitorTaskList.start(updata);

    if (document.location.pathname === '/en/advEdit' && priceData.readData() !== '') { 
        run();
    }

     // const [ task ] = tasks.filter(task => task);
        // 1. get tasks from locale storage

        // 2. get orders for one task from binance
        // 3. check if tasks at first orders page have price then we can change our order
        // 4. Change order price
        // 5. Continue monitoring
    
    useAddCreateTaskForm();
    saveOrderIdsToLocaleStorage();

    return (
        <div>
        
        </div>
    );
};

export default App;
