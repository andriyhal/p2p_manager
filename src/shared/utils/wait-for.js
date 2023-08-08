export class WaitFor {
  constructor(sleep) {
    this.sleep = sleep;
    this.timerId = null;
    this.terminate = false;
  }

  start(callback) {
    const update = () => {
      if (this.terminate) {
        callback();
        this.timerId = setTimeout(update, this.sleep);
      }
    };

    this.terminate = true;
    update();
  }

  stop() {
    this.terminate = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
    }
  }
}
