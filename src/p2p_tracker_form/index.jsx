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

const P2PTrackerFormContainer = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	gap: '15px'
});

export const P2PTrackerForm = props => {
	const { control, handleSubmit } = useForm();
	const { isTaskStored } = useTaskLocalStorage();
	const [isTask, setIsTask] = useState(isTaskStored(props.orderId));

	const handleSaveTask = submitData => {
		handleSaveTaskToLocalStorage(submitData, props);
		setIsTask(isTaskStored(props.orderId));
	};

	const handleDelete = () => {
		handleDeleteTask(props);
		setIsTask(isTaskStored(props.orderId));
		checkOrStopTaskMonitoring();
	};

	return (
		<P2PTrackerFormContainer>
			<FormContainer
				onSubmit={handleSubmit(handleSaveTask)}
				id={props.orderId}
			>
				<FormInputsGroup control={control} orderId={props.orderId}/>
				{isTask ? (
					<>
						<EditButton />
						<TrashButton deleteTask={handleDelete} />
					</>
				) : (
					<PlusButton />
				)}
			</FormContainer>
		</P2PTrackerFormContainer>
	);
};
