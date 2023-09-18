import React from 'react';
import { FormInputText } from '../FormInputText';

export const FormInputsGroup = ({ control, orderId }) => {
	const tasksInfo = JSON.parse(localStorage.getItem('tasksInfo') || []);
	const [ task ] = tasksInfo.filter(task => task.orderId === orderId);
	return (
		<>
			<FormInputText
				label='Price limit'
				name='priceLimit'
				defaultValue={!!task ? task.priceLimit : '0'}
				control={control}
			/>
			<FormInputText
				label='Beat by'
				name='beatBy'
				defaultValue={!!task ? task.beatBy : '0.03'}
				control={control}
			/>
		</>
	);
};
