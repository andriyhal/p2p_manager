import React, { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { animationTransition } from '../TrashButton';

const textFieldStyle = {
	width: '100px',
	borderColor: '#1976D2',
	color: '#1976D2'
};

const calculatePriceFromSpot = ({ p2pPrice, spotPrice }) =>
	((p2pPrice / spotPrice) * 100).toFixed(2);

const PercentageModifier = ({ spotPrice, p2pPrice, onChange }) => {
	const [percentage, setPercentage] = useState(
		calculatePriceFromSpot({ spotPrice, p2pPrice })
	);

	const handlePercentageChange = event => {
		const newPercentage = parseFloat(event.target.value).toFixed(2);
		setPercentage(newPercentage);
		event.target.value = ((spotPrice * newPercentage) / 100).toFixed(2);
		onChange(event);
	};

	useEffect(() => {
		setPercentage(calculatePriceFromSpot({ spotPrice, p2pPrice }));
		onChange({
			target: { value: calculatePriceFromSpot({ spotPrice, p2pPrice }) }
		});
	}, [spotPrice, p2pPrice]);

	return (
		<Box display='flex' flexDirection='row' alignItems='center' gap='10px'>
			<h5 style={{ minWidth: '150px' }}>
				{Number(spotPrice).toFixed(2)} * {percentage}% ={' '}
				{(spotPrice * (percentage / 100)).toFixed(2)}
			</h5>

			<TextField
				variant='outlined'
				type='number'
				size='small'
				label='Percentage'
				value={percentage}
				onChange={handlePercentageChange}
				style={textFieldStyle}
				InputProps={{
					inputProps: {
						step: '0.10'
					}
				}}
			/>
		</Box>
	);
};

export const FormPercentageModifier = ({
	label,
	name,
	control,
	defaultValue,
	spotPrice,
	p2pPrice
}) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<PercentageModifier
					spotPrice={spotPrice}
					p2pPrice={p2pPrice}
					helperText={error ? error.message : null}
					size='small'
					error={!!error}
					onChange={onChange}
					fullWidth
					label={label}
					variant='outlined'
					sx={animationTransition}
				/>
			)}
		/>
	);
};
