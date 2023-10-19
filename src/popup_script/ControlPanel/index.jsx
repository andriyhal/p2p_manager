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
	const [status, setStatus] = useState(localStorage.getItem('status') || 'START_BOT');

	useEffect(() => localStorage.setItem('status', status), [status]);
	

	const handleClick = () => {
		const isStatus = () => {
			if (status === 'START_BOT') {
				setStatus('STOP_BOT');
				return { action: 'START_BOT', type: 'POPUP' };
			}
			setStatus('START_BOT');
			return { action: 'STOP_BOT', type: 'POPUP' };
		};

		chrome.runtime.sendMessage(isStatus());
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
