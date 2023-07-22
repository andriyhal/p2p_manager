import React from 'react';
import { _label } from './label.module.css';

export default function Label({ children, htmlFor, ...props }) {
    return (
        <label className={_label} {...props}>
            {children}
        </label>
    );
}
