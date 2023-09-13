class LocalStorageManager {
    constructor(key) {
        if (typeof key !== 'string' && key.length === 0) {
            throw new Error(
                'Incorrect key! Key must be string with length > 0'
            );
        }

        this.key = key;
    }

    saveData(data) {
        if (typeof data ===  'object' && data !== null) {
            localStorage.setItem(this.key, JSON.stringify(data))
        } else {
            localStorage.setItem(this.key, data)
        }
    }

    readData() {
        const data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : null;
    }
}

export default LocalStorageManager;