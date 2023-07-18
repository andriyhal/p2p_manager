export class WaitFor {
    constructor(sleep) {
        this.sleep = sleep;
        this.terminate = false;
    }

    #update(callback) {
        if (this.terminate) {
            setTimeout(
                () => {
                    callback();
                    this.#update(callback);
                },
                this.sleep
            );
        }
    }

    start(callback) {
        this.terminate = true;
        this.#update(callback);
    }

    stop() {
        this.terminate = false;
    }
}