import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ selectedItems }) => {

    const [isAcademicOpen, setIsAcademicOpen] = useState(false);
    
      const toggleAcademicDropdown = () => {
        setIsAcademicOpen((prev) => !prev);
    };
    return (
        <>
             <aside className="w-64 bg-gray-100 p-4 border-r border-gray-300 relative overflow-y-auto">
                    <nav>
                        <h2 className="text-lg font-semibold mb-4">Main Nav</h2>
                        <ul>
                            <li>
                                <h3
                                    className="text-sm font-semibold mb-2 cursor-pointer flex justify-between items-center"
                                    onClick={toggleAcademicDropdown}
                                >
                                    Academic
                                    <span>{isAcademicOpen ? '▲' : '▼'}</span>
                                </h3>
                                {isAcademicOpen && (
                                    <ul className="ml-4 text-sm">
                                        {selectedItems.map((item) => (
                                            <li
                                                key={item}
                                                className="mb-2 cursor-pointer hover:text-blue-500"
                                            >
                                                <Link to = {`/academic/${item.toLowerCase()}`}>
                                                   {item}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                            <li className="mt-4">Communication</li>
                            <li className="mt-2">Email</li>
                            <li className="mt-2">AVETMISS</li>
                        </ul>
                    </nav>

                    {/* Settings at the bottom */}
                    <div className="absolute bottom-4 left-4 right-4">
                    <Link
                         to = "/academic-setting"
                            className="w-full bg-gray-200 text-sm font-semibold py-2 px-4 rounded hover:bg-gray-300"
                            // onClick={toggleSettingsSidebar}
                        >
                            Settings
                        </Link>
                    </div>
             </aside>

                {/* Secondary Sidebar for Settings */}
                {/* {true && (
                    <aside className="w-64 bg-gray-50 p-4 border-r border-gray-300">
                        <h2 className="text-lg font-semibold mb-4">Settings</h2>
                        <ul className="text-sm">
                            {selectedItems.map((item, index) => (
                            <li
                                key={item.id}
                                className={`mb-2 p-2 rounded cursor-pointer ${
                                    item.isSelected
                                        ? 'bg-blue-100'
                                        : 'hover:bg-gray-200'
                                }`}
                                onClick={() => handleItemSelect(item.id)}
                            >
                                <span>{item.name}</span>
                            </li>
                            
                            ))}
                        </ul>
                    </aside>
                )} */}

        </>
    );
};

export default Sidebar;
