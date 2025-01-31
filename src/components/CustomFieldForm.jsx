import React, { useState, useEffect } from 'react';
import api from '../api';
import { useParams } from 'react-router-dom';
import { showToast } from '../utils/toastUtils';

const CustomFieldForm = ({ onClose, instituteId }) => {

    const { type } = useParams()
    const [title, setTitle] = useState('');
    const [isRequired, setIsRequired] = useState(false);
    const [fieldType, setFieldType] = useState('text');
    const [showInTableView, setShowInTableView] = useState(false);
    const [allowExportInTableView, setAllowExportInTableView] = useState(false);
    const [options, setOptions] = useState('');
    const [defaultValue, setDefaultValue] = useState('');
    const [description, setDescription] = useState('');
    const [fieldOptions, setFieldOptions] = useState([]);

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const data = {
                name: title,
                is_required: isRequired,
                type: fieldType,
                item_type: type,
                show_in_table: showInTableView,
                allow_export: allowExportInTableView,
                options,
                default_value: defaultValue,
                description,
            };
            await api.createCustomField(data);
            showToast('success', 'Created', 'Custom Field created successfully!');
        } catch (error) {
            showToast('error', 'Error', 'Oops! Something went wrong');
        }
    };

    const handleFieldTypeChange = (e) => {
        setFieldType(e.target.value);
        if (['select', 'radio', 'checkbox', 'file'].includes(e.target.value)) {
            setOptions('');
        }
    };

    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg ">
    <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {/* Add Custom Field for {academicItem} */}
    </h2>
    <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title/Label */}
        <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">Title/Label</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </div>

        {/* Is Required */}
        <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">Is Required</label>
            <div className="flex space-x-4 mt-2">
                <label className="flex items-center">
                    <input
                        type="radio"
                        value={true}
                        checked={isRequired === true}
                        onChange={() => setIsRequired(true)}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                    <input
                        type="radio"
                        value={false}
                        checked={isRequired === false}
                        onChange={() => setIsRequired(false)}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
            </div>
        </div>

        {/* Field Type */}
        <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">Field Type</label>
            <select
                value={fieldType}
                onChange={handleFieldTypeChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
                <option value="text">Text</option>
                <option value="textarea">Textarea</option>
                <option value="number">Number</option>
                <option value="select">Select</option>
                <option value="radio">Radio</option>
                <option value="checkbox">Checkbox</option>
                <option value="file">File</option>
            </select>
        </div>

        {/* Options */}
        {['select', 'radio', 'checkbox'].includes(fieldType) && (
            <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">Options (comma-separated)</label>
                <textarea
                    value={options}
                    onChange={(e) => setOptions(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
        )}

        {/* Show in Table View */}
        <div className="form-group flex items-center">
            <input
                type="checkbox"
                checked={showInTableView}
                onChange={() => setShowInTableView(!showInTableView)}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-gray-700">Show in Table View</label>
        </div>

        {/* Allow Export */}
        <div className="form-group flex items-center">
            <input
                type="checkbox"
                checked={allowExportInTableView}
                onChange={() => setAllowExportInTableView(!allowExportInTableView)}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-gray-700">Allow Export in Table View</label>
        </div>

        {/* Default Value */}
        <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">Default Value</label>
            <input
                type="text"
                value={defaultValue}
                onChange={(e) => setDefaultValue(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </div>

        {/* Description */}
        <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:ring focus:ring-blue-500"
            >
                Save Custom Field
            </button>
            <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 focus:ring focus:ring-gray-400"
            >
                Cancel
            </button>
        </div>
    </form>
</div>

    );
};

export default CustomFieldForm;

