import React from 'react';
import '../styles/SkillsPanel.css'; // Importa tus estilos CSS

const SkillsPanel = ({ unlockedSkills, playerAttributes }) => {
    return (
        <div className="skills-panel">
            <h3>Habilidades desbloqueadas</h3>
            
            <ul>
                {unlockedSkills.map(skill => {
                    const { name, description, statMultiplier, baseDamage, damageRange, critMultiplier } = skill;
                    const playerStatValue = playerAttributes[statMultiplier];

                    // Calcula el daño base multiplicado por el atributo
                    const baseSkillDamage = baseDamage * playerStatValue;

                    // Calcula el daño final dentro del rango
                    const minDamage = baseSkillDamage + damageRange[0];
                    const maxDamage = baseSkillDamage + damageRange[1];

                    // Calcula el daño crítico
                    const critDamage = baseSkillDamage * critMultiplier;

                    return (
                        <li key={name} className={statMultiplier.toLowerCase()}>
                            <p>{name}</p>
                            <p>{description}</p>
                            <p>Daño: {minDamage} - {maxDamage}</p>
                            <p>Daño Crítico: {critDamage}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default SkillsPanel;
