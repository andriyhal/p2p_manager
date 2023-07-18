import React from 'react';
import Item from './Item';

import { item_list_container } from './css/item-list.module.css';

const ItemList = ({ items }) => {
  return (
    <div className={item_list_container}>
      {items.map((item, index) => (
        <Item key={index} name={item.name} price={item.price} type={item.type} />
      ))}
    </div>
  );
};

export default ItemList;