import React from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { animationTransition } from '../TrashButton';
import { styled } from '@mui/system';

const ControlledTextField = styled(TextField)`
	width: ${({ width }) => (width ? width : '70px')};
`;

export const FormInputText = ({
	name,
	label,
	control,
	defaultValue,
	width
}) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<ControlledTextField
					helperText={error ? error.message : null}
					size='small'
					error={!!error}
					onChange={onChange}
					value={value}
					fullWidth
					label={label}
					variant='outlined'
					sx={animationTransition}
				/>
			)}
		/>
	);
};
