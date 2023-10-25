import React, { useEffect, useState } from 'react';
import {
	spinner,
	rotateCw,
	rotateCcw,
	controlPanel,
	controlButton,
	start,
	stop
} from './button.module.css';

export const ControlPanel = () => {
	const [status, setStatus] = useState(
		localStorage.getItem('status') || 'START_BOT'
	);

	useEffect(() => localStorage.setItem('status', status), [status]);

	const handleClick = () => {
		if (status === 'START_BOT') {
			setStatus('STOP_BOT');
			chrome.runtime.sendMessage({
				action: 'START_BOT',
				type: 'POPUP'
			});
		} else {
			setStatus('START_BOT');
			chrome.runtime.sendMessage({ action: 'STOP_BOT', type: 'POPUP' });
		}
	};

	return (
		<div className={controlPanel}>
			<button
				className={`${controlButton} ${
					status === 'START_BOT' ? start : stop
				}`}
				onClick={handleClick}
			>
				<div
					className={
						spinner + ' ' + status === 'START_BOT'
							? rotateCcw
							: rotateCw
					}
				/>
				{status === 'START_BOT' ? 'Старт' : 'Стоп'}
			</button>
		</div>
	);
};
