import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import api from '../api';
import Sidebar from '../components/SideBar';
// import CustomFieldForm from './components/CustomFieldForm';
import CustomFieldForm from '../components/CustomFieldForm';
import { useParams } from 'react-router-dom';

const AddCustomField = () => {

    const { type } = useParams()

    const [selectedItems, setSelectedItems] = useState([]);
    const [instituteId, setInstituteId] = useState(1); // Default institute ID
    const [hierarchy, setHierarchy] = useState([]);
    const [showCustomFieldForm, setShowCustomFieldForm] = useState(false);
    const [selectedAcademicItemForCustomField, setSelectedAcademicItemForCustomField] = useState(null);
    const [defaultFields, setDefaultFields] = useState({});
    const [fieldValues, setFieldValues] = useState({});
    const [isAcademicOpen, setIsAcademicOpen] = useState(false);
    
     const [isSettingsSidebarOpen, setIsSettingsSidebarOpen] = useState(false);

    const toggleSettingsSidebar = () => {
        setIsSettingsSidebarOpen((prev) => !prev);
    };
    const toggleAcademicDropdown = () => {
        setIsAcademicOpen((prev) => !prev);
    };

    useEffect(() => {
        // fetchData();
    }, []);

   

    return (
            <div className="flex h-screen">
                {/* Main Sidebar */}
               
                <Sidebar
                selectedItems = {hierarchy}
                isAcademicOpen={isAcademicOpen}
                toggleAcademicDropdown={toggleAcademicDropdown}
            />
                {/* Main Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <CustomFieldForm  />
                </main>
            </div>
    );
};

export default AddCustomField

