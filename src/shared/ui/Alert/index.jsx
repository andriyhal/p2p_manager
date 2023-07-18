import React from 'react';
import { _alert, _alert__error } from './alert.module.css';

const alertClassByType = {
	error: _alert__error
};

export default function Alert({ children, type }) {
	const alertTypeClass = alertClassByType[type] ? alertClassByType[type] : '';

	return (
		<p role="alert" className={`${_alert} ${alertTypeClass}`}>
			{children}
		</p>
	)
}