import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Item from '../components/Item';
import api from '../api';
import CustomFieldForm from '../components/CustomFieldForm';
import CustomFieldList from '../components/CustomFieldList'
import Sidebar from '../components/SideBar';
import SettingsSidebar from '../components/SettingsSidebar';

const AcademicSetting = () => {

    const initialAcademicItems = [
        { id: 'faculty', name: 'Faculty', order: 1, isSelected: false },
        { id: 'program', name: 'Program', order: 2, isSelected: false },
        { id: 'batch', name: 'Batch', order: 3, isSelected: false },
        { id: 'session', name: 'Session', order: 4, isSelected: false },
        { id: 'semester', name: 'Semester', order: 5, isSelected: false },
        { id: 'section', name: 'Section', order: 6, isSelected: false },
        { id: 'classroom', name: 'Classroom', order: 7, isSelected: false },
        { id: 'course', name: 'Course', order: 8, isSelected: false },
        { id: 'department', name: 'Department', order: 9, isSelected: false },
        { id: 'class_year', name: 'Class/Year', order: 10, isSelected: false },
        { id: 'subject', name: 'Subject', order: 11, isSelected: false },
        { id: 'unit', name: 'Unit', order: 12, isSelected: false },
        { id: 'module', name: 'Module', order: 13, isSelected: false },
        { id: 'assessment', name: 'Assessment', order: 14, isSelected: false },
        { id: 'grading', name: 'Grading', order: 15, isSelected: false },
        { id: 'curriculum', name: 'Curriculum', order: 16, isSelected: false },
        { id: 'learning_outcome', name: 'Learning Outcome', order: 17, isSelected: false },
        { id: 'academic_calendar', name: 'Academic Calendar', order: 18, isSelected: false },
        { id: 'event', name: 'Event', order: 19, isSelected: false },
    ];

   
    const [academicItems, setAcademicItems] = useState(initialAcademicItems);
    const [selectedItems, setSelectedItems] = useState([]);
    const [instituteId, setInstituteId] = useState(1); // Default institute ID
    const [hierarchy, setHierarchy] = useState([]);
    const [showCustomFieldForm, setShowCustomFieldForm] = useState(false);
    const [selectedAcademicItemForCustomField, setSelectedAcademicItemForCustomField] = useState(null);
    const [defaultFields, setDefaultFields] = useState({});
    const [fieldValues, setFieldValues] = useState({});
    const [isAcademicOpen, setIsAcademicOpen] = useState(false);
    
    const [isSettingsSidebarOpen, setIsSettingsSidebarOpen] = useState(false);
    
     useEffect(() => {
    },[selectedItems])


    const toggleSettingsSidebar = () => {
        setIsSettingsSidebarOpen((prev) => !prev);
    };
    const toggleAcademicDropdown = () => {
        setIsAcademicOpen((prev) => !prev);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // const instituteResponse = await api.fetchInstitute(instituteId);
            // const institute = instituteResponse.data;
            const hierarchyResponse = await api.fetchHierarchy(1);
            const hierarchyData = hierarchyResponse.data;
            setHierarchy(hierarchyData);

            // const academicItemsResponse = await api.fetchAcademicItems(instituteId);
            // const selectedItemsFromBackend = academicItemsResponse.data.selected_academic_items || [];

            // const updatedItems = initialAcademicItems.map(item => {
            //     const backendItem = selectedItemsFromBackend.find(backendItem => backendItem === item.id);
            //     return { ...item, isSelected: !!backendItem };
            // });
            // setAcademicItems(updatedItems);

            const selectedItems = updatedItems.filter(item => item.isSelected);
            setSelectedItems(selectedItems);

            // Fetch default fields for selected items
            const initialFieldValues = {};
            for (const item of selectedItems) {
                const fields = await fetchDefaultFields(item.id);
                setDefaultFields(prev => ({ ...prev, [item.id]: fields }));
                initialFieldValues[item.id] = {};
                for (const field of fields) {
                    initialFieldValues[item.id][field.id] = '';
                }
            }
            setFieldValues(initialFieldValues);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchDefaultFields = async (academicItemId) => {
        try {
            let response;
            switch (academicItemId) {
                case 'program':
                    response = await api.fetchPrograms(instituteId);
                    return response.data.map(item => ({ id: item.id, name: 'title', type: 'text', label: 'Title', value: item.title }));
                case 'course':
                    response = await api.fetchCourses(instituteId);
                    return response.data.map(item => ({ id: item.id, name: 'title', type: 'text', label: 'Title', value: item.title }));
                case 'assessment':
                    response = await api.fetchAssessments(instituteId);
                    return response.data.map(item => ({ id: item.id, name: 'title', type: 'text', label: 'Title', value: item.title }));
                case 'batch':
                    response = await api.fetchBatches(instituteId);
                    return response.data.map(item => ({ id: item.id, name: 'name', type: 'text', label: 'Name', value: item.name }));
                case 'semester':
                    response = await api.fetchSemesters(instituteId);
                    return response.data.map(item => ({ id: item.id, name: 'name', type: 'text', label: 'Name', value: item.name }));
                case 'unit':
                    response = await api.fetchUnits(instituteId);
                    return response.data.map(item => ({ id: item.id, name: 'title', type: 'text', label: 'Title', value: item.title }));
                case 'module':
                    response = await api.fetchModules(instituteId);
                    return response.data.map(item => ({ id: item.id, name: 'title', type: 'text', label: 'Title', value: item.title }));
                case 'grading':
                    response = await api.fetchGradings(instituteId);
                    return response.data.map(item => ({ id: item.id, name: 'name', type: 'text', label: 'Name', value: item.name }));
                case 'department':
                    response = await api.fetchDepartments(instituteId);
                    return response.data.map(item => ({ id: item.id, name: 'name', type: 'text', label: 'Name', value: item.name }));
                case 'faculty':
                    response = await api.fetchFaculties(instituteId);
                    return response.data.map(item => ({ id: item.id, name: 'name', type: 'text', label: 'Name', value: item.name }));
                case 'session':
                    response = await api.fetchSessions(instituteId);
                    return response.data.map(item => ({ id: item.id, name: 'name', type: 'text', label: 'Name', value: item.name }));
                case 'section':
                    response = await api.fetchSections(instituteId);
                    return response.data.map(item => ({ id: item.id, name: 'name', type: 'text', label: 'Name', value: item.name }));
                case 'class_year':
                    response = await api.fetchClassYears(instituteId);
                    return response.data.map(item => ({ id: item.id, name: 'name', type: 'text', label: 'Name', value: item.name }));
                case 'classroom':
                    response = await api.fetchClassrooms(instituteId);
                    return response.data.map(item => ({ id: item.id, name: 'name', type: 'text', label: 'Name', value: item.name }));
                case 'subject':
                    response = await api.fetchSubjects(instituteId);
                    return response.data.map(item => ({ id: item.id, name: 'name', type: 'text', label: 'Name', value: item.name }));
                case 'curriculum':
                    response = await api.fetchCurriculums(instituteId);
                    return response.data.map(item => ({ id: item.id, name: 'name', type: 'text', label: 'Name', value: item.name }));
                case 'learning_outcome':
                    response = await api.fetchLearningOutcomes(instituteId);
                    return response.data.map(item => ({ id: item.id, name: 'name', type: 'text', label: 'Name', value: item.name }));
                case 'academic_calendar':
                    response = await api.fetchAcademicCalendars(instituteId);
                    return response.data.map(item => ({ id: item.id, name: 'name', type: 'text', label: 'Name', value: item.name }));
                case 'event':
                    response = await api.fetchEvents(instituteId);
                    return response.data.map(item => ({ id: item.id, name: 'name', type: 'text', label: 'Name', value: item.name }));
                default:
                    return [];
            }
        } catch (error) {
            console.error('Error fetching default fields:', error);
            return [];
        }
    };

    // const handleItemSelect = (id) => {
    //     const updatedItems = academicItems.map(item =>
    //         item.id === id ? { ...item, isSelected: !item.isSelected } : item
    //     );
    //     // setAcademicItems(updatedItems);
    //     const selectedItems = updatedItems.filter(item => item.isSelected);
    //     setSelectedItems(selectedItems);
    // };

    const handleItemSelect = (id) => {
    const updatedItems = academicItems.map(item =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item
    );

    setAcademicItems(updatedItems);
    setSelectedItems(prevSelectedItems => {
        const selectedItem = academicItems.find(item => item.id === id);

        if (prevSelectedItems.some(selected => selected.id === id)) {
            return prevSelectedItems.filter(selected => selected.id !== id);
        } else {
           
            return [
                ...prevSelectedItems,
                {
                    id: selectedItem.id,
                    name: selectedItem.name,
                    order: prevSelectedItems.length + 1, 
                },
            ];
        }
    });
};



    const handleSaveHierarchy = async () => {
        try {
            const orderedItems = academicItems
                .filter(item => item.isSelected)
                .map((item, index) => ({ ...item, order: index + 1 }));

            const hierarchyData = orderedItems.map(item => item.name);
            await api.saveHierarchy(instituteId, { hierarchy: hierarchyData });
            setHierarchy(hierarchyData);
            alert('Hierarchy saved successfully!');
        } catch (error) {
            console.error('Error saving hierarchy:', error);
            alert('Failed to save hierarchy.');
        }
    };

    const handleItemMove = (dragIndex, hoverIndex) => {
        const dragItem = selectedItems.find(item => item.order === dragIndex + 1);
        const hoverItem = selectedItems.find(item => item.order === hoverIndex + 1);

        if (dragItem && hoverItem) {
            const updatedItems = selectedItems.map(item => {
                if (item.id === dragItem.id) {
                    return { ...item, order: hoverIndex + 1 };
                } else if (item.id === hoverItem.id) {
                    return { ...item, order: dragIndex + 1 };
                }
                return item;
            }).sort((a, b) => a.order - b.order);
            setSelectedItems(updatedItems);
        }
    };

    const handleOpenCustomFieldForm = (academicItem) => {
        setSelectedAcademicItemForCustomField(academicItem);
        setShowCustomFieldForm(true);
    };

    const handleCloseCustomFieldForm = () => {
        setShowCustomFieldForm(false);
        setSelectedAcademicItemForCustomField(null);
    };

    const handleDefaultFieldValueChange = (academicItemId, fieldId, value) => {
        setFieldValues(prev => ({
            ...prev,
            [academicItemId]: {
                ...prev[academicItemId],
                [fieldId]: value
            }
        }));
    };

    const handleSaveDefaultFieldValues = async (academicItemId) => {
        try {
            const values = fieldValues[academicItemId];
            console.log('Saving default field values:', academicItemId, values);
            // Here you would make an API call to save the default field values
            // For example: await api.saveDefaultFieldValues(academicItemId, values);
            alert('Default field values saved successfully!');
        } catch (error) {
            console.error('Error saving default field values:', error);
            alert('Failed to save default field values.');
        }
    };

    return (
            <div className="flex h-screen">
                {/* Main Sidebar */}
               
            <Sidebar
                selectedItems = {hierarchy}
                isAcademicOpen={isAcademicOpen}
                toggleAcademicDropdown={toggleAcademicDropdown}
            />
                {/* Main Content */}
            <main className="flex w-full">
                <div className='h-full w-[25%] overflow-y-auto'>
                    <SettingsSidebar
                        academicItems={academicItems}
                        //  isSelected={isSelected}
                            onSelect={handleItemSelect}
                            // onMove={handleItemMove}
                    />
                </div>
                <div className='h-full w-[75%] overflow-y-auto'>
                     <h1 className="text-xl font-bold mb-4">Academic Item Hierarchy</h1>
                    <div className="items-container grid grid-cols-1 gap-4">
                        {selectedItems.map((item, index) => (
                            <Item
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            order={index}
                            isSelected={item.isSelected}
                            onSelect={handleItemSelect}
                            onMove={handleItemMove}
                        />
                        ))}
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        onClick={handleSaveHierarchy}
                    >
                        Save Hierarchy
                    </button>

                    
                    {/* {selectedItems.map(item => (
                    <div key={item.id}>
                        <h3>{item.name}</h3>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleOpenCustomFieldForm(item.id)}>Add Custom Field</button>
                        {defaultFields[item.id] && defaultFields[item.id].map(field => (
                            <div key={field.id}>
                                <label>{field.label}:</label>
                                <input
                                    type={field.type}
                                    value={fieldValues[item.id]?.[field.id] || ''}
                                    onChange={(e) => handleDefaultFieldValueChange(item.id, field.id, e.target.value)}
                                />
                            </div>
                        ))}
                        {defaultFields[item.id] && defaultFields[item.id].length > 0 && (
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleSaveDefaultFieldValues(item.id)}>Save Default Values</button>
                        )}
                    </div>
                ))} */}
                </div>
                

                {/* {
                    showCustomFieldForm && (
                    <CustomFieldForm
                        academicItem={selectedAcademicItemForCustomField}
                        onClose={handleCloseCustomFieldForm}
                        instituteId={instituteId}
                    />
                )} */}
                </main>
            </div>
    );
};

export default AcademicSetting

