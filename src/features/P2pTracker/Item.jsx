import React from 'react';
import { item_container } from './css/item.module.css';

const Item = ({ name, price, type }) => {
  return (
    <div className={item_container}>
      <span>{name}</span>
      <span>{price}</span>
      <span>{type}</span>
    </div>
  );
};

export default Item;