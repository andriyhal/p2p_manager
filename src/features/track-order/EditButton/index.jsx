import React from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/system';

const EditButtonCss = styled(Button)({
	minHeight: '23px',
	minWidth: '23px',
	borderRadius: '50%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: '#fcd535',
	'&:hover': {
		backgroundColor: '#fcd535',
		opacity: '0.7'
	}
});

const EditIconCss = styled(EditIcon)({
	margin: '0',
	color: '#fff'
});

export const EditButton = () => {
	return (
		<EditButtonCss variant='contained' type='submit'>
			<EditIconCss />
		</EditButtonCss>
	);
};
