import React from 'react';
import { useForm } from 'react-hook-form';

const TextInput = ({ label, name }) => {
    const {
        register,
        formState: { errors }
    } = useForm();

    return (
        <div>
            <label htmlFor={name}>{label}:</label>
            <input id={name} type="text" {...register(name)} />
            {errors[name] && <span>{errors[name].message}</span>}
        </div>
    );
};

export default TextInput;