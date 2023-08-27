import React, { useState } from 'react';
import { FormInputText } from '../FormInputText';

export const FormInputsGroup = ({ control }) => {
	return (
		<>
			<FormInputText
				label='price threshold'
				name='priceThreshold'
				control={control}
			/>
			<FormInputText
				label='target order amount'
				name='targetOrderAmount'
				defaultValue='0.03'
				control={control}
			/>
		</>
	);
};
