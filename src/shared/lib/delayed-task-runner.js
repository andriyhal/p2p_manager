export const delayedTaskRunner = sleep => {
	let terminate = false;

	const start = callback => {
		const update = () => {
			if (!terminate) {
				setTimeout(() => {
					callback();
					update();
				}, sleep);
			}
		};

		terminate = false;
		update();
	};

	const stop = () => {
		terminate = true;
	};

	return { start, stop };
};
