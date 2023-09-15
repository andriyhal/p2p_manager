import React, { useState } from 'react';
import { FormInputText } from '../FormInputText';

export const FormInputsGroup = ({ control, orderId }) => {
	const tasksInfo = JSON.parse(localStorage.getItem('tasksInfo') || []);
	const [ task ] = tasksInfo.filter(task => task.orderId === orderId);
	return (
		<>
			<FormInputText
				label='price threshold'
				name='priceThreshold'
				defaultValue={!!task ? task.priceThreshold : '0'}
				control={control}
			/>
			<FormInputText
				label='target order amount'
				name='targetOrderAmount'
				defaultValue={!!task ? task.targetOrderAmount : '0.03'}
				control={control}
			/>
		</>
	);
};
