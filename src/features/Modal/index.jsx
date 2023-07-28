import React from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '../../shared/ui/TextInput';

const Modal = ({ isOpen, onClose, onAddTask }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data) => {
        onAddTask(data);
        reset();
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal_content">
                <h2>Добавить элемент</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextInput
                        label="Nickname: "
                        name="nickName"
                        register={register}
                        errors={errors}
                    />
                    {/* <input
                        id="nickName"
                        type="text"
                        {...register('nickName')}
                    /> */}
                    <TextInput
                        label="Fiat: "
                        name="fiat"
                        register={register}
                        errors={errors}
                    />
                    <TextInput
                        label="Asset: "
                        name="asset"
                        register={register}
                        errors={errors}
                    />
                    <TextInput
                        label="Trade type: "
                        name="tradeType"
                        register={register}
                        errors={errors}
                    />
                    <button type="submit">Добавить</button>
                    <button type="button" onClick={onClose}>
                        Закрыть
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
