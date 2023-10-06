import React from 'react';
import { FormInputText } from '../FormInputText';
import { TASKS_INFO_STORAGE_KEY } from '../../../shared/config';

export const FormInputsGroup = ({ control, orderId }) => {
	const tasksInfo = JSON.parse(localStorage.getItem(TASKS_INFO_STORAGE_KEY) || []);
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
