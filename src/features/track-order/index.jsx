import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/system';
import { TrashButton } from './TrashButton';
import { PlusButton } from './PlusButton';
import { EditButton } from './EditButton';
import useTaskLocalStorage from './use-task-local-storage';
import {
	handleDeleteTask,
	handleSaveTaskToLocalStorage
} from './task-event-handlers';
import { FormInputsGroup } from './FormInputsGroup';

const FormContainer = styled('form')({
	position: 'absolute',
	width: '300px',
	display: 'flex',
	gap: '15px',
	right: 0,
	bottom: '10px'
});

const OrderTrackerFormContainer = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	gap: '15px'
});

export const OrderTrackerForm = ({parsedDataOrder}) => {
	const { control, handleSubmit } = useForm();
	const { isTaskStored } = useTaskLocalStorage();
	const [isTask, setIsTask] = useState(isTaskStored(parsedDataOrder.id));

	const handleSaveTask = submitData => {
		handleSaveTaskToLocalStorage(submitData, parsedDataOrder);
		setIsTask(isTaskStored(parsedDataOrder.id));
	};

	const handleDelete = () => {
		handleDeleteTask(parsedDataOrder);
		setIsTask(isTaskStored(parsedDataOrder.id));
		checkOrStopTaskMonitoring();
	};

	return (
		<OrderTrackerFormContainer>
			<FormContainer
				onSubmit={handleSubmit(handleSaveTask)}
				id={parsedDataOrder.id}
			>
				<FormInputsGroup control={control} orderId={parsedDataOrder.id}/>
				{isTask ? (
					<>
						<EditButton />
						<TrashButton deleteTask={handleDelete} />
					</>
				) : (
					<PlusButton />
				)}
			</FormContainer>
		</OrderTrackerFormContainer>
	);
};
