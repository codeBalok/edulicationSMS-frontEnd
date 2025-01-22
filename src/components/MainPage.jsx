import React, { useState, useEffect } from 'react';
import SettingsSidebar from './SettingsSidebar';
import AcademicItemsList from './AcademicItemsList';
import api from '../api';

const MainPage = () => {
    const initialAcademicItems = [
        { id: 'faculty', name: 'Faculty', order: 1, isSelected: false },
        { id: 'program', name: 'Program', order: 2, isSelected: false },
        // Add the rest of the academic items here...
    ];

    const [academicItems, setAcademicItems] = useState(initialAcademicItems);
    const [isSettingsSidebarOpen, setIsSettingsSidebarOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Fetch academic items and other data from the API
            const response = await api.fetchAcademicItems(1); // Example institute ID
            const itemsFromBackend = response.data.selected_academic_items || [];
            const updatedItems = initialAcademicItems.map((item) => ({
                ...item,
                isSelected: itemsFromBackend.includes(item.id),
            }));
            setAcademicItems(updatedItems);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleItemSelect = (id) => {
        setAcademicItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, isSelected: !item.isSelected } : item
            )
        );
    };

    const toggleSettingsSidebar = () => {
        setIsSettingsSidebarOpen((prev) => !prev);
    };

    return (
        <div className="main-page">
            <SettingsSidebar
                isOpen={isSettingsSidebarOpen}
                toggleSidebar={toggleSettingsSidebar}
            />
            <AcademicItemsList
                items={academicItems}
                onItemSelect={handleItemSelect}
            />
        </div>
    );
};

export default MainPage;
