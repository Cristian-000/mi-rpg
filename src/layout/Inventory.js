/* Inventory.js */
import React, { useState } from 'react';
import '../styles/Inventory.css';

const Inventory = ({ inventory, removeItemFromInventory, equippedItems, equipItem, playerLevel }) => {
    const [selectedItem, setSelectedItem] = useState(null); // Nuevo estado para el item seleccionado
    const [confirmDelete, setConfirmDelete] = useState(false); // Nuevo estado para confirmar la eliminación

    // Función para verificar si un elemento está equipado
    const isEquipped = (item) => {
        const itemKey = item.type;
        return equippedItems[itemKey] === item;
    };

    // Función para mostrar o ocultar los detalles del item
    const toggleItemDetails = (item) => {
        if (selectedItem === item) {
            // Si el mismo elemento se hace clic nuevamente, oculta los detalles
            setSelectedItem(null);
        } else {
            setSelectedItem(item);
        }
    };

    // Función para equipar o desequipar el item
    const toggleEquipItem = (item) => {
        if (isEquipped(item)) {
            equipItem(item, false);
        } else if (playerLevel >= item.requiredLevel) {
            equipItem(item, true);
        }
    };

    // Función para confirmar la eliminación de un item
    const confirmDeleteItem = (item) => {
        setSelectedItem(item); // Establece el elemento seleccionado
        setConfirmDelete(true); // Muestra la confirmación de eliminación
        
    };

    // Función para cancelar la eliminación
    const cancelDelete = () => {
        setConfirmDelete(false); // Oculta la confirmación de eliminación
    };

    const deleteItem = (item) => {
        if (!isEquipped(item)) {
            removeItemFromInventory(item); // Elimina el item solo si no está equipado
        }
        setSelectedItem(null);
        setConfirmDelete(false); // Oculta la confirmación de eliminación
    };

    return (
        <div className="inventory-panel">
            <h3>Inventario</h3>
            <div className="inventory-grid">
                {inventory.map((item, index) => (
                    <div
                        key={index}
                        className={`inventory-item ${selectedItem === item ? 'selected' : ''}`}
                        onClick={() => toggleItemDetails(item)}
                    >
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
            {selectedItem && (
    <div className="item-details">
        <h4>{selectedItem.name}</h4>
        <p>{selectedItem.description}</p>
        <p>Nivel Requerido: {selectedItem.requiredLevel}</p>
        <p>Bonificaciones:</p>
        <ul>
            {Object.entries(selectedItem.statBonus).map(([stat, bonus]) => (
                <li key={stat}>
                    {stat}: {bonus}
                </li>
            ))}
        </ul>
        <button onClick={() => toggleEquipItem(selectedItem)}>
            {isEquipped(selectedItem) ? 'Desequipar' : 'Equipar'}
        </button>
        {!isEquipped(selectedItem) && (
            <button onClick={() => confirmDeleteItem(selectedItem)}>Eliminar</button>
        )}
    </div>
)}

            {confirmDelete && (
                <div className="delete-confirmation">
                    <p>¿Seguro que deseas eliminar "{selectedItem.name}"?</p>
                    <button onClick={() => deleteItem(selectedItem)}>Sí</button>
                    <button onClick={cancelDelete}>No</button>
                </div>
            )}
        </div>
    );
};

export default Inventory;
