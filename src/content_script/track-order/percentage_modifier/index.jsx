import React, {useState, useEffect, useCallback} from 'react';
import {Box, TextField} from '@mui/material';
import {Controller} from 'react-hook-form';
import {animationTransition} from '../TrashButton';
import {styled} from "@mui/system";

const textFieldStyle = {
    width: '100px',
    borderColor: '#1976D2',
    color: '#1976D2'
};

const getFormattedPrice = (number) => new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
}).format(parseFloat(number))

const calculatePercentageFromSpot = ({p2pPrice, spotPrice}) =>
    ((p2pPrice / spotPrice) * 100);

const calculateP2pPrice = ({percentage, spotPrice}) =>
    (spotPrice * (percentage / 100))

//color: ${({isValid = true}) => isValid ? "green" : "red"}
const FinalPriceLabel = styled("h5")`
  font-size: 14px;
  color: #1976D2;
  font-weight: 400;
`;


const PercentageModifier = ({spotPrice, p2pPrice, onChange}) => {
    const [percentage, setPercentage] = useState(
        calculatePercentageFromSpot({spotPrice, p2pPrice})
    );

    const handlePercentageChange = useCallback(event => {
        const newPercentage = parseFloat(event.target.value);
        setPercentage(newPercentage);
        event.target.value = newPercentage;
        onChange(event);
    }, [onChange]);

    useEffect(() => {
        setPercentage(calculatePercentageFromSpot({spotPrice, p2pPrice}));
        onChange({
            target: {value: calculatePercentageFromSpot({spotPrice, p2pPrice})}
        });
    }, [spotPrice, p2pPrice]);

    return (
        <Box display='flex' flexDirection='row' alignItems='center' gap='10px'>
            <FinalPriceLabel>
                {getFormattedPrice(spotPrice)}
                {" * "}
                <b>{getFormattedPrice(percentage)}%</b>
                {" = "}
                {getFormattedPrice(calculateP2pPrice({percentage, spotPrice}))}
            </FinalPriceLabel>

            <TextField
                variant='outlined'
                type='number'
                size='small'
                label='Percentage'
                value={percentage.toFixed(2)}
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
                                           p2pPrice
                                       }) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({field: {onChange}, fieldState: {error}}) => (
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
