import React from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const animationTransition = {
	transition: 'color 200ms, border-color 200ms, background 200ms',
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderColor: '#1976D2'
		},
		'&:hover fieldset': {
			borderColor: '#1976D2'
		}
	},
	'& .MuiInputLabel-root': {
		color: '#1976D2'
	},
	'& .MuiOutlinedInput-input': {
		color: '#1976D2',
		minWidth: '70px'
	}
};

export const FormInputText = ({ name, label, control, defaultValue }) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<TextField
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
