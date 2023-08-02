import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller } from 'react-hook-form';
import { styled } from '@mui/system';

const generateSingleOptions = (options) => {
    return options.map((option) => {
        return (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>
        );
    });
};

const FormControlContainer = styled(FormControl)({
    minWidth: '100px',
});
