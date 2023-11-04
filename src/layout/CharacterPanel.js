import React from 'react';
import '../styles/CharacterPanel.css'; // Importa tus estilos CSS

const CharacterPanel = ({ attributes, increaseAttribute, availableAttributePoints }) => {
    return (
        <div className="character-panel">
            <h3 title="Consumo de puntos de características: 1 para 1 hasta 25, 2 para 1 hasta 50 y 3 para 1 después de 50">Características</h3>
            
            <div className="attribute-container">
                <div className="attribute">
                    <p>Fuerza: {attributes.strength}</p>
                    <button onClick={() => increaseAttribute('strength')}>+</button>
                </div>
                <div className="attribute">
                    <p>Agilidad: {attributes.agility}</p>
                    <button onClick={() => increaseAttribute('agility')}>+</button>
                </div>
                <div className="attribute">
                    <p>Inteligencia: {attributes.intelligence}</p>
                    <button onClick={() => increaseAttribute('intelligence')}>+</button>
                </div>
                <div className="attribute">
                    <p>Suerte: {attributes.luck}</p>
                    <button onClick={() => increaseAttribute('luck')}>+</button>
                </div>
                <div className="attribute">
                    <p>Vitalidad: {attributes.vitality}</p>
                    <button onClick={() => increaseAttribute('vitality')}>+</button>
                </div>
            </div>

            <p title="Se ganan 5 puntos por nivel">Puntos disponibles: {availableAttributePoints}</p>


        </div>
    );
}

export default CharacterPanel;
