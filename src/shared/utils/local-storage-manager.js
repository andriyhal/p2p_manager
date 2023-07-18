class LocalStorageManager {
    constructor(key) {
        if (typeof key !== 'string' && key.length === 0) {
            throw new Error('Incorrect key! Key must be string with length > 0');
        }

        this.key = key;
    }

    saveData(data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    }

    readData() {
        const data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : null;
    }
}

export default LocalStorageManager;