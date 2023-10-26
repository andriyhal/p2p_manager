export const delayedTaskRunner = sleep => {
	let terminate = false;

	const start = async callback => {
		// Сделайте эту функцию асинхронной
		const update = async () => {
			// Сделайте эту функцию асинхронной
			if (!terminate) {
				await new Promise(res => setTimeout(res, sleep)); // Дождитесь окончания тайм-аута
				if (!terminate) {
					await callback(); // Дождитесь завершения callback
					await update(); // Рекурсивно вызовите update, дождавшись его завершения
				}
			}
		};

		terminate = false;
		await update(); // Дождитесь завершения update
	};

	const stop = () => {
		terminate = true;
	};

	return { start, stop };
};
