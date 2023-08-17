export class WaitFor {
	constructor(sleep) {
		this.sleep = sleep;
		this.terminate = false;
	}

	start(callback) {
		const update = () => {
			if (this.terminate) {
				setTimeout(() => {
					callback();
					update();
				}, this.sleep);
			}
		};

		this.terminate = true;
		update();
	}

	stop() {
		this.terminate = false;
	}
}
