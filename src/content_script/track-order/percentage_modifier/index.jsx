import React, { useState, useEffect, useCallback } from 'react';
import { Box, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { animationTransition } from '../TrashButton';
import { styled } from '@mui/system';

const textFieldStyle = {
	width: '190px',
	borderColor: '#1976D2',
	color: '#1976D2'
};

const getFormattedPrice = number =>
	new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(parseFloat(number));

const calculatePercentageFromSpot = ({ p2pPrice, spotPrice }) =>
	(p2pPrice / spotPrice) * 100;

const calculateP2pPrice = ({ percentage, spotPrice }) =>
	spotPrice * (percentage / 100);

// color: ${({ isValid = true }) => (isValid ? '#1976D2' : 'crimson')};
const FinalPriceLabel = styled('h5')`
	font-size: 14px;
	color: #1976d2;
	font-weight: 400;
`;

const calculateIsPercentValid = (orderType, percent) => {
	if (orderType === 'BUY' && percent < 100) {
		return false;
	}

	if (orderType === 'SELL' && percent > 100) {
		return false;
	}

	return true;
};

const PercentageModifier = ({
	spotPrice,
	p2pPrice,
	defaultPercentage,
	onChange,
	orderType
}) => {
	const [percentage, setPercentage] = useState(
		defaultPercentage ||
			calculatePercentageFromSpot({ spotPrice, p2pPrice })
	);

	const handlePercentageChange = useCallback(
		event => {
			const newPercentage = parseFloat(event.target.value);
			setPercentage(newPercentage);
			event.target.value = newPercentage;
			onChange(event);
		},
		[onChange]
	);

	return (
		<Box display='flex' flexDirection='row' alignItems='center' gap='10px'>
			<FinalPriceLabel
				isValid={calculateIsPercentValid(orderType, percentage)}
			>
				{getFormattedPrice(spotPrice)}
				{' * '}
				<b>{getFormattedPrice(percentage)}%</b>
				{' = '}
				{getFormattedPrice(
					calculateP2pPrice({ percentage, spotPrice })
				)}
			</FinalPriceLabel>

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
				sx={animationTransition}
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
	orderType,
	percentage,
	p2pPrice
}) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={({ field: { onChange }, fieldState: { error } }) => (
				<PercentageModifier
					spotPrice={spotPrice}
					p2pPrice={p2pPrice}
					defaultPercentage={percentage}
					orderType={orderType}
					onChange={onChange}
					label={label}
					sx={animationTransition}
				/>
			)}
		/>
	);
};
