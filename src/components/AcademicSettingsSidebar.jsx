import React from 'react';

const AcademicSettingsSidebar = ({ isOpen, academicItems, isSelected, onSelect, toggleSidebar }) => {

     const handleSelect = (id) => {
        onSelect(id);
    };

    return (
          <aside className="flex flex-col items-center justify-center bg-white  border-r-4 border-gray-50 h-full">
            <div className='flex justify-center items-center mb-4 w-full border-b-2 border-gray-50 h-[10%] bg-white'>
                <h2 className="text-lg font-semibold mb-4">Settings</h2>
            </div>
                <ul className="flex h-[90%] w-full flex-col px-4 gap-2 overflow-y-auto">
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

export default AcademicSettingsSidebar;
