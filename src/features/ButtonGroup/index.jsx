import React from 'react';

import { buttons } from './button-group.module.css';

const ButtonGroup = ({ onAdd, onClose }) => {
  return (
    <div className={ buttons }>
      <button onClick={ onAdd }>Добавить</button>
      <button onClick={ onClose }>Отменить</button>
    </div>
  );
};

export default ButtonGroup;