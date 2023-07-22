import React from 'react';
import { _border_box, _input } from './input.module.css';

const Input = ({ ...props }) => {
    return <input className={_input} {...props} />;
};

export default Input;
