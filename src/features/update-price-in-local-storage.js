import LocalStorageManager from "../utils/local-storage-manager";

const tasksInfo = new LocalStorageManager('tasksInfo');
tasksInfo.saveData(tasksInfo.readData() ? tasksInfo.readData() : []);


export const updatePriceInLocalStorage = (orderId, orderPrice) => {

    tasksInfo.saveData(tasksInfo.readData().map(item => 
        item.orderId === orderId ? {...item, orderPrice: JSON.stringify(orderPrice) } : item
    ));
}