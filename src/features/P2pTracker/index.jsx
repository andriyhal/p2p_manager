import React, { useState } from 'react';
import ItemList from './ItemList';
import Button from '../../shared/ui/Button';
import Modal from '../../features/Modal';

const P2pTracker = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addItem = newItem => {
    setItems(prevItems => [...prevItems, newItem]);
    setIsModalOpen(false);
  };

  return (
    <div>
      <ItemList items={items} />
      <Button label="Добавить" onClick={openModal} />
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} onAddTask={addItem} />}
    </div>
  );
};

export default P2pTracker;