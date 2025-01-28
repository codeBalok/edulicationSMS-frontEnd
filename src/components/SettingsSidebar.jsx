import React, { useState} from 'react';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import { FiDatabase } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { toKebabCase } from '../utils/stringUtils';

const SettingsSidebar = ({ selectedItems, isOpen, academicItems, isSelected, onSelect, toggleSidebar }) => {

     const handleSelect = (id) => {
        onSelect(id);
    };
    
     const [isAcademicOpen, setIsAcademicOpen] = useState(false);
    
      const toggleAcademicDropdown = () => {
        setIsAcademicOpen((prev) => !prev);
    };

    return (
        <aside className="flex flex-col items-center justify-center bg-white  border-r-4 border-gray-50 h-full">
            <div className='flex justify-center items-center mb-4 w-full border-b-2 border-gray-50 h-[10%] bg-white'>
                <h2 className="text-lg font-semibold mb-4">Settings</h2>
            </div>
                        <ul className="flex h-[90%] flex-col gap-4">
                            <li>
                                <NavLink className='flex items-center gap-1 mb-1' to="/academic-setting">
                                    <HiOutlineBookOpen className='text-2xl' />
                                    <span
                                        className="cursor-pointer flex justify-between items-center"
                                    >
                                    Academic  
                                    </span>
                                </NavLink>
                            </li>
                         
                             <li className=''> 
                            <div className='flex items-center gap-2 cursor-pointer mb-3'>
                                <FiDatabase className='text-2xl' />
                                <span
                                    className="cursor-pointer flex justify-between items-center"
                                    onClick={toggleAcademicDropdown}
                                >
                                   Custom Fields
                                </span>
                             </div>
                                {isAcademicOpen && (
                                    <ul className="flex px-10 flex-col gap-2 text-base">
                                        {selectedItems.map((item) => (
                                            <li
                                                key={item}
                                                className="mb-2 cursor-pointer hover:text-blue-500"
                                            >
                                                <Link to = {`/custom-field/${toKebabCase(item)}`}>
                                                   {item}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                            
                            {/* <li>
                                <NavLink to = "/academic-setting">Academic Setting</NavLink>
                            </li> */}
                        </ul>
                    </aside>
    );
};

export default SettingsSidebar;
