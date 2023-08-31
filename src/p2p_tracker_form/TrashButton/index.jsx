import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';

const TrashButtonCss = styled(Button)({
	minHeight: '23px',
	minWidth: '23px',
	borderRadius: '50%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: 'crimson',
	'&:hover': {
		backgroundColor: 'crimson',
		opacity: '0.7'
	}
});

const DeleteIconCss = styled(DeleteIcon)({
	margin: '0',
	color: '#fff'
});

export const TrashButton = props => {
	return (
		<TrashButtonCss variant='contained' onClick={() => props.deleteTask()}>
			<DeleteIconCss />
		</TrashButtonCss>
	);
};
