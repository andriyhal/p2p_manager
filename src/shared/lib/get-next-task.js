function* taskGenerator() {
    const tasksStr = localStorage.getItem('tasksInfo');
    if (!tasksStr) return;
    const tasks = JSON.parse(tasksStr);
    const currentIndexStr = localStorage.getItem('currentTaskIndex');
    const currentIndex = currentIndexStr ? parseInt(currentIndexStr, 10) : 0;
    for (let i = currentIndex; i < tasks.length; i++) {
        localStorage.setItem('currentTaskIndex', i.toString());
        yield tasks[i];
    }
}

const taskIterator = taskGenerator();

export const getNextTask = async () => {
    const { value, done } = taskIterator.next();
    
    if (done) {
        console.log('No more tasks left');
        localStorage.removeItem('currentTaskIndex');
        return null;
    }
    return value;
};
