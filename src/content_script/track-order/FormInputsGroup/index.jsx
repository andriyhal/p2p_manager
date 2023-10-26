import React from 'react';
import { FormInputText } from '../FormInputText';
import { CheckBox } from '../check_box';
import { TASKS_INFO_STORAGE_KEY } from '../../../shared/config';
import { FormPercentageModifier } from '../percentage_modifier';

export const FormInputsGroup = ({
	control,
	orderId,
	spotPrice,
	p2pPrice,
	orderType
}) => {
	const tasksInfo = JSON.parse(
		localStorage.getItem(TASKS_INFO_STORAGE_KEY) || []
	);

	const task = tasksInfo.find(task => task.id === orderId);

	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
			<FormPercentageModifier
				label='Percentage'
				name='percentage'
				spotPrice={spotPrice}
				percentage={task?.percentage}
				p2pPrice={p2pPrice}
				control={control}
				orderType={orderType}
			/>
			<FormInputText
				label='Beat by'
				name='beatBy'
				defaultValue={!!task ? task.beatBy : '0.03'}
				control={control}
			/>
			<CheckBox
				defaultValue={!!task ? !!task.isMerchant : false}
				control={control}
				name='isMerchant'
				label='M'
			/>
		</div>
	);
};
