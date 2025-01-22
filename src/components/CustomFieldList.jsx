import React, { useState, useEffect } from 'react';
import api from '../api';
import CustomFieldForm from './CustomFieldForm';
import { toast } from 'react-toastify';

const CustomFieldList = ({ instituteId, academicItems }) => {
    const [customFields, setCustomFields] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [selectedCustomField, setSelectedCustomField] = useState(null);

    useEffect(() => {
        fetchCustomFields();
    }, [instituteId]);

    const fetchCustomFields = async () => {
        setLoading(true);
        try {
            const data = await api.fetchCustomFields(instituteId);
            setCustomFields(data);
        } catch (error) {
            console.error('Error fetching custom fields:', error);
            toast.error(`Error fetching custom fields: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCustomField = () => {
        setSelectedCustomField(null);
        setShowForm(true);
    };

    const handleEditCustomField = (customField) => {
        setSelectedCustomField(customField);
        setShowForm(true);
    };

    const handleDeleteCustomField = async (customField) => {
        if (window.confirm('Are you sure you want to delete this custom field?')) {
            try {
                await api.deleteCustomField(instituteId, customField.id);
                toast.success('Custom field deleted successfully!');
                fetchCustomFields();
            } catch (error) {
                console.error('Error deleting custom field:', error);
                toast.error(`Error deleting custom field: ${error.message}`);
            }
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setSelectedCustomField(null);
    };

    const handleCustomFieldCreated = () => {
        fetchCustomFields();
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Academic Custom Fields</h2>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <button
                        onClick={handleAddCustomField}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                    >
                        Add Custom Field
                    </button>
                    {customFields.length === 0 ? (
                        <p>No custom fields added yet.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="py-2 px-4 border-b">Item</th>
                                        <th className="py-2 px-4 border-b">Title</th>
                                        <th className="py-2 px-4 border-b">Label</th>
                                        <th className="py-2 px-4 border-b">Field Type</th>
                                        <th className="py-2 px-4 border-b">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customFields.map((customField) => (
                                        <tr key={customField.id} className="hover:bg-gray-50">
                                            <td className="py-2 px-4 border-b">{customField.academicItem.name}</td>
                                            <td className="py-2 px-4 border-b">{customField.title}</td>
                                            <td className="py-2 px-4 border-b">{customField.label}</td>
                                            <td className="py-2 px-4 border-b">{customField.field_type}</td>
                                            <td className="py-2 px-4 border-b">
                                                <button
                                                    onClick={() => handleEditCustomField(customField)}
                                                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCustomField(customField)}
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
            {showForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg w-1/2">
                        <CustomFieldForm
                            instituteId={instituteId}
                            academicItems={academicItems}
                            onClose={handleCloseForm}
                            onCustomFieldCreated={handleCustomFieldCreated}
                            customField={selectedCustomField || undefined}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomFieldList;
