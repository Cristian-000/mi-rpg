import React from 'react';
//import '../styles/Item.css';

const Item = ({ item, onAddToInventory, equipable, playerLevel }) => {
  const { name, description, value, requiredLevel } = item;

  const handleAddToInventory = () => {
    onAddToInventory(item);
  };

  return (
    <div className="item">
      <p>Nombre: {name}</p>
      <p>Descripción: {description}</p>
      <p>Nivel requerido: {requiredLevel}</p>
      <p>Valor de venta: {value}</p>
      <button onClick={handleAddToInventory}>Agregar al Inventario</button>
    </div>
  );
};

export default Item;
