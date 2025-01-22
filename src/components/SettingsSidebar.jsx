import React from 'react';

const SettingsSidebar = ({ isOpen, academicItems, isSelected, onSelect, toggleSidebar }) => {

     const handleSelect = (id) => {
        onSelect(id);
    };

    return (
          <aside className=" bg-gray-50 border-r border-gray-300 ">
                        <h2 className="text-lg font-semibold mb-4">Settings</h2>
                        <ul className="text-sm">
                {
                        academicItems.map((item, index) => (
                            <li
                                key={item.id}
                                className={`mb-2 p-2 rounded cursor-pointer ${
                                    item.isSelected
                                        ? 'bg-blue-100'
                                        : 'hover:bg-gray-200'
                                }`}
                                onClick={() => handleSelect(item.id)}
                            >
                                <span>{item.name}</span>
                            </li>
                            
                            ))}
                        </ul>
                    </aside>
    );
};

export default SettingsSidebar;
