import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { toKebabCase } from '../utils/stringUtils';
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { HiOutlineBookOpen } from "react-icons/hi";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdChatBubbleOutline } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";

const Sidebar = ({ selectedItems }) => {

    const [isAcademicOpen, setIsAcademicOpen] = useState(false);
    
      const toggleAcademicDropdown = () => {
        setIsAcademicOpen((prev) => !prev);
    };
    return (
        <>
             <aside className="w-64 flex flex-col bg-white border-r-4  border-gray-50">
                <nav className='h-[92%] overflow-y-auto'>
                    {/* <div className='py-4 mb-4 border-b-2 fixed w-64 border-gray-50 p-4'> */}
                    <div className='py-4 mb-4 w-64 bg-white border-r-4 border-b-2 border-gray-50 p-4 fixed'>
                        <Link to = "/" className="text-lg font-semibold">Main Nav</Link>
                    </div>
                        <ul className='flex flex-col gap-4 p-4 mt-16'>
                            <li className='flex items-center gap-3 cursor-pointer'>
                               <MdOutlinePeopleAlt className='text-2xl' />
                               <span>
                                 Student
                                </span>
                            </li>
                            <li className=''> 
                            <div className='flex items-center gap-3 cursor-pointer mb-3'>
                                <HiOutlineBookOpen className='text-2xl' />
                                <span
                                    className="cursor-pointer flex justify-between items-center"
                                    onClick={toggleAcademicDropdown}
                                >
                                   Academic  
                                </span>
                             </div>
                                {isAcademicOpen && (
                                    <ul className="flex px-10 flex-col gap-2 text-base">
                                        {selectedItems.map((item) => (
                                            <li
                                                key={item}
                                                className="mb-2 cursor-pointer hover:text-blue-500"
                                            >
                                                <Link to = {`/academic/${toKebabCase(item)}-list`}>
                                                   {item}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                            <li className='flex items-center gap-3 cursor-pointer'>
                               <MdChatBubbleOutline className='text-2xl' />
                               <span>
                                 Communication
                                </span>
                            </li>
                            <li className='flex items-center gap-3 cursor-pointer'>
                               <MdOutlineMailOutline className='text-2xl' />
                               <span>
                                 Email
                                </span>
                            </li>
                            <li className='flex items-center gap-3 cursor-pointer'>
                               <IoDocumentTextOutline className='text-2xl' />
                               <span>
                                 AVETMISS
                                </span>
                            </li>
                        </ul>
                    </nav>

                    {/* Settings at the bottom */}
                    <div className="h-[8%] flex items-center border-t-4 border-gray-50">
                    <Link
                         to = "/setting"
                            className="px-4"
                    >
                        <div className='flex items-center gap-1'>
                            <IoSettingsOutline className='text-2xl'/>
                            <p className='text-lg'>Settings</p>
                        </div>
                        </Link>
                    </div>
             </aside>
        </>
    );
};

export default Sidebar;
