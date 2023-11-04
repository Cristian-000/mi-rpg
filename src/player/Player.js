import React, { useState } from 'react';

import '../styles/Player.css'; // Importa tus estilos CSS
import CharacterPanel from '../layout/CharacterPanel';
import SkillsPanel from '../layout/SkillsPanel'; // Asegúrate de importar el componente
import Inventory from '../layout/Inventory';
import Item from '../Items/Item';

export const Player = () => {
    const [playerData, setPlayerData] = useState({
        name: 'Jugador 1',
        level: 1,
        experience: 0,
        health: 100, // Nueva propiedad de vida
        energy: 80, // Nueva propiedad de energía
        availableAttributePoints: 5,
        attributes: {
            strength: 10,
            agility: 10,
            intelligence: 10,
            luck: 10,
            vitality: 10
        },
        inventory: [],
    });
    const [playerLevel, setPlayerLevel] = useState(1); // Estado independiente para el nivel del jugador

    const [showInventory, setShowInventory] = useState(false); // Nuevo estado para el inventario
    const [equippedItems, setEquippedItems] = useState({
        Arma: null,      // Inicialmente no hay arma equipada
        Armadura: null,  // Inicialmente no hay armadura equipada
        Anillo: null,    // Inicialmente no hay anillo equipado
        Amuleto: null,   // Inicialmente no hay amuleto equipado
    });
    const equipItem = (item, equip) => {
        if (item && item.type in equippedItems) {
          if (equip) {
            // Equipar el elemento
            setEquippedItems((prevState) => ({
              ...prevState,
              [item.type]: item,
            }));
          } else {
            // Desequipar el elemento
            setEquippedItems((prevState) => ({
              ...prevState,
              [item.type]: null,
            }));
          }
        }
      };
      

    const toggleInventory = () => {
        setShowInventory(!showInventory);
    };

    // Función para agregar un elemento al inventario
    const addToInventory = (item) => {
        setPlayerData((prevState) => ({
            ...prevState,
            inventory: [...prevState.inventory, item],
        }));
    };

    // Función para eliminar un elemento del inventario
    const removeItemFromInventory = (item) => {
        const updatedInventory = playerData.inventory.filter((inventoryItem) => inventoryItem !== item);

        setPlayerData((prevState) => ({
            ...prevState,
            inventory: updatedInventory,
        }));
    };
    const [showPanel, setShowPanel] = useState(true);

    const [showSkillsPanel, setShowSkillsPanel] = useState(false); // Nuevo estado para el panel de habilidades

    const togglePanel = () => {
        setShowPanel(!showPanel);
    };
    const toggleSkillsPanel = () => {
        setShowSkillsPanel(!showSkillsPanel);
        console.log("Unlocked Skills:", unlockedSkills);
    };


    const increaseAttribute = (attributeName) => {
        const { attributes, availableAttributePoints} = playerData;
        const currentValue = attributes[attributeName];

        // Definir los costos para aumentar los atributos
        let cost = 1;

        if (currentValue < 25) {
            cost = 1;
        } else if (currentValue >= 25 && currentValue <= 50) {
            cost = 2;
        } else if (currentValue > 50) {
            cost = 3;
        }

        // Verificar si el jugador tiene puntos disponibles y el nivel requerido
        if (availableAttributePoints >= cost) {
            if (attributeName === "vitality") {
                setPlayerData((prevState) => ({
                    ...prevState,
                    availableAttributePoints: prevState.availableAttributePoints - cost,
                    attributes: {
                        ...prevState.attributes,
                        [attributeName]: currentValue + 1,
                    },
                    health: prevState.health + 10,
                }));
            } else {
                setPlayerData((prevState) => ({
                    ...prevState,
                    availableAttributePoints: prevState.availableAttributePoints - cost,
                    attributes: {
                        ...prevState.attributes,
                        [attributeName]: currentValue + 1,
                    },
                }));
            }
        }
    };


    const gainExperience = () => {
        const { level, experience } = playerData;

        // Aumentar la experiencia
        setPlayerData((prevState) => ({
            ...prevState,
            experience: prevState.experience + 500,
        }));

        // Verificar si el jugador debe subir de nivel
        const experienceNeeded = level * 100;

        if (experience >= experienceNeeded) {
            setPlayerData((prevState) => ({
                ...prevState,
                level: prevState.level + 1,
                health: prevState.health + (4 * level),
                energy: prevState.energy + (2 * level),
                experience: experience - experienceNeeded,
                availableAttributePoints: prevState.availableAttributePoints + 5, // Ganar 5 puntos de características al subir de nivel
            }));
            setPlayerLevel((prevLevel) => prevLevel + 1);
        }
    };
    const calculateTotalStats = () => {
        const totalStats = { ...playerData.attributes };
    
        // Sumar las bonificaciones del equipo equipado
        Object.keys(equippedItems).forEach((type) => {
            const item = equippedItems[type];
            if (item && item.statBonus) {
                Object.keys(item.statBonus).forEach((stat) => {
                    if (stat in totalStats) {
                        totalStats[stat] += item.statBonus[stat];
                    }
                });
            }
        });
    
        return totalStats;
    };
    
    const totalStats = calculateTotalStats();
    
    const allSkills = [
        {
            name: 'Golpe Poderoso',
            description: 'Un golpe poderoso que inflige daño alto.',
            statMultiplier: 'strength',
            baseDamage: 20,
            damageRange: [15, 30],
            critMultiplier: 1.5,
        },
        {
            name: 'Patada Baja',
            description: 'Una patada baja que puede derribar al enemigo.',
            statMultiplier: 'agility',
            baseDamage: 18,
            damageRange: [12, 26],
            critMultiplier: 1.5,
        },
        {
            name: 'Grito de Poder',
            description: 'Un grito que aturde a los enemigos cercanos.',
            statMultiplier: 'intelligence',
            baseDamage: 22,
            damageRange: [18, 34],
            critMultiplier: 1.5,
        },
        {
            name: 'Habilidad 4',
            description: 'Una habilidad misteriosa con daño variable.',
            statMultiplier: 'luck',
            baseDamage: 25,
            damageRange: [20, 40],
            critMultiplier: 1.5,
        },
        {
            name: 'Llamarada',
            description: 'Invoca una llamarada que quema al enemigo.',
            statMultiplier: 'strength',
            baseDamage: 24,
            damageRange: [20, 35],
            critMultiplier: 1.5,
        },
        {
            name: 'Corte Rápido',
            description: 'Realiza un corte rápido con alta agilidad.',
            statMultiplier: 'agility',
            baseDamage: 20,
            damageRange: [15, 30],
            critMultiplier: 1.5,
        },
        {
            name: 'Escudo Protector',
            description: 'Crea un escudo mágico que protege al jugador.',
            statMultiplier: 'intelligence',
            baseDamage: 28,
            damageRange: [24, 38],
            critMultiplier: 1.5,
        },
        {
            name: 'Explosión de Fuego',
            description: 'Causa una explosión de fuego devastadora.',
            statMultiplier: 'luck',
            baseDamage: 30,
            damageRange: [25, 40],
            critMultiplier: 1.5,
        },
        {
            name: 'Corte Veloz',
            description: 'Realiza un corte rápido con alta agilidad.',
            statMultiplier: 'agility',
            baseDamage: 15,
            damageRange: [10, 25],
            critMultiplier: 1.5,
        },
        {
            name: 'Rayo Arcano',
            description: 'Lanza un rayo mágico que inflige daño de inteligencia.',
            statMultiplier: 'intelligence',
            baseDamage: 25,
            damageRange: [20, 35],
            critMultiplier: 2.0,
        },
        {
            name: 'Flecha Mortal',
            description: 'Dispara una flecha mortal que se beneficia de la suerte.',
            statMultiplier: 'luck',
            baseDamage: 18,
            damageRange: [15, 30],
            critMultiplier: 2.0,
        },
        {
            name: 'Sanación Divina',
            description: 'Cura al jugador con una energía divina.',
            statMultiplier: 'intelligence',
            baseDamage: -30, // Representa la curación, puede ser un valor negativo
            damageRange: [-25, -20],
            critMultiplier: 1.5,
        },
        {
            name: 'Furia Desatada',
            description: 'Entra en un estado de furia, aumentando la fuerza durante un tiempo limitado.',
            statMultiplier: 'strength',
            baseDamage: 0, // Puedes dejarlo en 0 si esta habilidad no inflige daño directo
            damageRange: [0, 0],
            critMultiplier: 1.0,
        }

        // Agrega más habilidades aquí
    ];



    // Determina el nivel mínimo requerido para desbloquear cada habilidad
    const skillUnlockLevels = {};

    // Distribuye las habilidades entre los atributos y desbloquea un skill de cada atributo cada 5 niveles
    const numSkillsPerAttribute = Math.floor(allSkills.length / Object.keys(playerData.attributes).length);
    const levelsPerNewSkill = 5;

    Object.keys(playerData.attributes).forEach((attribute, attributeIndex) => {
        for (let i = 0; i < numSkillsPerAttribute; i++) {
            const skillIndex = attributeIndex + i * Object.keys(playerData.attributes).length;
            if (skillIndex < allSkills.length) {
                const skill = allSkills[skillIndex];
                const levelRequired = attributeIndex * levelsPerNewSkill + (i + 1);
                skillUnlockLevels[skill.name] = levelRequired;
            }
        }
    });
    // const unlockedSkills = allSkills.filter(skill => playerData.level >= skillUnlockLevels[skill]);
    const unlockedSkills = allSkills.filter(skill => playerData.level >= skillUnlockLevels[skill.name]);


    const availableItems = [
        {
            name: 'Espada de Héroe',
            type: 'Arma',
            description: 'Una espada poderosa que otorga +10 de fuerza.',
            requiredLevel: 5,
            equipable: true, // Asegúrate de que esta propiedad esté configurada como true
            statBonus: { strength: 10 },
        },
        {
            name: 'Armadura de Placas',
            type: 'Armadura',
            description: 'Una resistente armadura que otorga +20 de defensa.',
            requiredLevel: 7,
            equipable: true, // Asegúrate de que esta propiedad esté configurada como true
            statBonus: { vitality: 20 },
        },
        {
            name: 'Anillo de la Suerte',
            type: 'Anillo',
            description: 'Un anillo mágico que otorga +5 de suerte.',
            requiredLevel: 3,
            equipable: true, // Asegúrate de que esta propiedad esté configurada como true
            statBonus: { luck: 5 },
        },
        {
            name: 'Daga Envenenada',
            type: 'Arma',
            description: 'Una daga con veneno que otorga +5 de fuerza y +5 de agilidad pero resta -5 de salud.',
            requiredLevel: 4,
            equipable: true,
            statBonus: { strength: 5, agility: 5, health: -5 },
          },
          {
            name: 'Capa de Invisibilidad',
            type: 'Armadura',
            description: 'Una capa que otorga +10 de agilidad y +5 de inteligencia pero resta -5 de defensa.',
            requiredLevel: 6,
            equipable: true,
            statBonus: { agility: 10, intelligence: 5, defense: -5 },
          },
          {
            name: 'Amuleto de Sabiduría',
            type: 'Amuleto',
            description: 'Un amuleto mágico que otorga +15 de inteligencia pero resta -5 de energía.',
            requiredLevel: 5,
            equipable: true,
            statBonus: { intelligence: 15, energy: -5 },
          },
          {
            name: 'Espada Rota',
            type: 'Arma',
            description: 'Una espada en mal estado que otorga -5 de fuerza y -5 de agilidad pero da vitalidad.',
            requiredLevel: 2,
            equipable: true,
            statBonus: { strength: -5, agility: -5, vitality: +20 },
          },
          {
            name: 'Piedra de la Suerte',
            type: 'Anillo',
            description: 'Una piedra que otorga +10 de suerte pero resta -5 de defensa.',
            requiredLevel: 4,
            equipable: true,
            statBonus: { luck: 10, defense: -5 },
          },
          
        // Agrega más elementos disponibles aquí
    ];


    return (
        <div className={`player-container ${showPanel ? '' : 'hidden'}`}>
            <h2>{playerData.name}</h2>
            <p>Nivel: {playerData.level}</p>
            <p>Experiencia: {playerData.experience}</p>
            <p>Vida: {playerData.health}</p>
            <p>Mana: {playerData.energy}</p>
            <div>
                <h2>Equipo Equipado</h2>
                <ul>
                    {Object.keys(equippedItems).map((type, index) => (
                        <li key={index}>
                            {equippedItems[type] ? (
                                <>
                                    <strong>{type}:</strong> {equippedItems[type].name}
                                </>
                            ) : (
                                `Nada equipado en ${type}`
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <button className="button" onClick={gainExperience}>
                Ganar Experiencia
            </button>
            <button onClick={togglePanel}>
                {showPanel ? 'Ocultar Características' : 'Mostrar Características'}
            </button>
            <button onClick={toggleSkillsPanel}>
                {showSkillsPanel ? 'Ocultar Habilidades' : 'Mostrar Habilidades'}
            </button>
            <button onClick={toggleInventory}>
                {showInventory ? 'Cerrar Inventario' : 'Abrir Inventario'}
            </button>
            {showPanel && (
                <CharacterPanel
                     attributes={totalStats}
                   // attributes={playerData.attributes}
                    increaseAttribute={increaseAttribute}
                    availableAttributePoints={playerData.availableAttributePoints}
                />
            )}
            {showSkillsPanel && (
                <SkillsPanel unlockedSkills={unlockedSkills} playerAttributes={playerData.attributes} />
            )}
            {showInventory && (
                <Inventory
                    inventory={playerData.inventory}
                    removeItemFromInventory={removeItemFromInventory}
                    equipItem={equipItem}
                    playerLevel={playerLevel} 
                    equippedItems={equippedItems}
                />
            )}
            <div>
                <h2>Elementos Disponibles</h2>
                <div className="items-container">
                    {availableItems.map((item, index) => (
                        <Item key={index} item={item} equipItem={equipItem} onAddToInventory={addToInventory} playerLevel={playerLevel} />
                    ))}
                </div>
            </div>
        </div>
    );
};