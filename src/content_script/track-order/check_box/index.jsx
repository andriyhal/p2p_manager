import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/system';
import { Controller } from 'react-hook-form';

const CheckBoxStyled = styled(Checkbox)({
	color: '#fcd535',
	'&.Mui-checked': {
		color: '#fcd535'
	}
});

const FormControlLabelStyled = styled(FormControlLabel)({
	'& .MuiTypography-root': {
		color: '#1976D2'
	}
});

export const CheckBox = ({ label, name, defaultValue, ...props }) => {
	return (
		<Controller
			name={name}
			control={props.control}
			defaultValue={defaultValue}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<FormControlLabelStyled
					control={
						<CheckBoxStyled
							{...props}
							onChange={e => onChange(e.target.checked)}
							checked={value}
							error={error}
						/>
					}
					label={label}
				/>
			)}
		/>
	);
};
