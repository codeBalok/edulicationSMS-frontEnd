import React from 'react';
import Item from './Item';

const AcademicItemsList = ({ items, onItemSelect }) => {
    return (
        <div className="academic-items-list">
            <h2>Academic Items</h2>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <Item
                            id={item.id}
                            name={item.name}
                            isSelected={item.isSelected}
                            onSelect={onItemSelect}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AcademicItemsList;
