import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/system';

const PlusButtonCss = styled(Button)({
	minHeight: '17px',
	minWidth: '17px',
	borderRadius: '50%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: '#7ad32b',
	'&:hover': {
		backgroundColor: '#7ad32b',
		opacity: '0.7'
	}
});

const EditIconCss = styled(AddIcon)({
	margin: '0',
	color: '#fff'
});

export const PlusButton = () => {
	return (
		<PlusButtonCss variant='contained' type='submit'>
			<EditIconCss />
		</PlusButtonCss>
	);
};
