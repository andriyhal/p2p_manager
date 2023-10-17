import React, { useState } from 'react';
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
	const [status, setStatus] = useState('START_BOT');
	const handleClick = () => {
		const isStatus = () => {
			if (status === 'START_BOT') {
				return { action: 'START_BOT', type: 'POPUP' };
			}

			return { action: 'STOP_BOT', type: 'POPUP' };
		};

		chrome.runtime.sendMessage(isStatus(), response => {
			setStatus(response.action);
		});
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
