import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/system';
import { Button } from '@mui/material';

import { FormInputText } from './input';

import { TrashButton } from './TrashButton';
import { PlusButton } from './PlusButton';
import { EditButton } from './EditButton';

import LocalStorageManager from '../utils/local-storage-manager';

const FormContainer = styled('form')({
	position: 'absolute',
	width: '300px',
	display: 'flex',
	gap: '15px',
	right: 0,
	bottom: '10px'
});

const P2PTrackerFormContainer = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	gap: '15px'
});

const tasksInfo = new LocalStorageManager('tasksInfo');
tasksInfo.saveData(tasksInfo.readData() ? tasksInfo.readData() : []);

const taskFilter = data => {
	const existingIndex = tasksInfo
		.readData()
		.findIndex(task => task.orderId === data.orderId);

	if (existingIndex === -1) {
		tasksInfo.saveData([...tasksInfo.readData(), data]);
	} else {
		tasksInfo.saveData(
			tasksInfo.readData().map(item =>
				item.orderId === data.orderId
					? {
							...item,
							priceThreshold: data.priceThreshold,
							targetOrderAmount: data.targetOrderAmount
					  }
					: item
			)
		);
	}
};

export const P2PTrackerForm = props => {
	const { control, handleSubmit } = useForm();
	const [isTask, setIsTask] = useState(
		!!tasksInfo
			.readData()
			.filter(task => task.orderId === props.orderId)?.[0]
	);

	const handleSaveTaskToLocalStorage = submitData => {
		console.log('Suka');
		const stringWithoutCommasPriceThreshold =
			submitData.priceThreshold.replace(/,/g, '');
		const parsedNumberPriceThreshold = parseFloat(
			stringWithoutCommasPriceThreshold
		);

		const stringWithoutCommasTargetOrderAmount =
			submitData.targetOrderAmount.replace(/,/g, '');
		const parsedNumberTargetOrderAmount = parseFloat(
			stringWithoutCommasTargetOrderAmount
		);

		taskFilter({
			priceThreshold: parsedNumberPriceThreshold,
			targetOrderAmount: parsedNumberTargetOrderAmount,
			...props
		});
	};

	const deleteTask = () => {
		setIsTask(false);

		tasksInfo.saveData(
			tasksInfo.readData().filter(task => task.orderId !== props.orderId)
		);
	};

	return (
		<P2PTrackerFormContainer>
			<FormContainer
				onSubmit={handleSubmit(handleSaveTaskToLocalStorage)}
				id={props.orderId}
			>
				<FormInputText
					label='price threshold'
					name='priceThreshold'
					control={control}
				/>
				<FormInputText
					label='target order amount'
					name='targetOrderAmount'
					control={control}
				/>
				{isTask ? (
					<>
						<EditButton />

						<TrashButton deleteTask={deleteTask} />
					</>
				) : (
					<PlusButton />
				)}
			</FormContainer>
		</P2PTrackerFormContainer>
	);
};
