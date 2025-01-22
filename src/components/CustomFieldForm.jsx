import React, { useState, useEffect } from 'react';
import api from '../api';

const CustomFieldForm = ({ academicItem, onClose, instituteId }) => {
    const [title, setTitle] = useState('');
    const [isRequired, setIsRequired] = useState(false);
    const [fieldType, setFieldType] = useState('text');
    const [showInTableView, setShowInTableView] = useState(false);
    const [allowExportInTableView, setAllowExportInTableView] = useState(false);
    const [options, setOptions] = useState('');
    const [defaultValue, setDefaultValue] = useState('');
    const [description, setDescription] = useState('');
    const [fieldOptions, setFieldOptions] = useState([]);

    useEffect(() => {
        if (academicItem) {
            fetchFieldOptions();
        }
    }, [academicItem]);

    const fetchFieldOptions = async () => {
        try {
            const response = await api.fetchCustomFields();
            const filteredOptions = response.data.filter(field => field.academic_item === academicItem);
            setFieldOptions(filteredOptions);
        } catch (error) {
            console.error('Error fetching custom fields:', error);
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const data = {
                academic_item_id: academicItem,
                label: title,
                is_required: isRequired,
                field_type: fieldType,
                show_in_table: showInTableView,
                allow_export: allowExportInTableView,
                options,
                default_value: defaultValue,
                description,
            };
            await api.createCustomField(instituteId,data);
            alert('Custom field created successfully!');
            onClose();
        } catch (error) {
            console.error('Error creating custom field:', error);
            alert('Failed to create custom field.');
        }
    };

    const handleFieldTypeChange = (e) => {
        setFieldType(e.target.value);
        if (['select', 'radio', 'checkbox', 'file'].includes(e.target.value)) {
            setOptions('');
        }
    };

    return (
        <div className="custom-field-form">
            <h2>Add Custom Field for {academicItem}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title/Label:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Is Required:</label>
                    <div className="radio-group">
                        <label>
                            <input type="radio" value={true} checked={isRequired === true} onChange={() => setIsRequired(true)} /> Yes
                        </label>
                        <label>
                            <input type="radio" value={false} checked={isRequired === false} onChange={() => setIsRequired(false)} /> No
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label>Field Type:</label>
                    <select value={fieldType} onChange={handleFieldTypeChange}>
                        <option value="text">Text</option>
                        <option value="textarea">Textarea</option>
                        <option value="number">Number</option>
                        <option value="select">Select</option>
                        <option value="radio">Radio</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="file">File</option>
                    </select>
                </div>
                {['select', 'radio', 'checkbox'].includes(fieldType) && (
                    <div className="form-group">
                        <label>Options (comma-separated):</label>
                        <textarea value={options} onChange={(e) => setOptions(e.target.value)} />
                    </div>
                )}
                <div className="form-group">
                    <label>Show in Table View:</label>
                    <input type="checkbox" checked={showInTableView} onChange={() => setShowInTableView(!showInTableView)} />
                </div>
                <div className="form-group">
                    <label>Allow Export in Table View:</label>
                    <input type="checkbox" checked={allowExportInTableView} onChange={() => setAllowExportInTableView(!allowExportInTableView)} />
                </div>
                <div className="form-group">
                    <label>Default Value:</label>
                    <input type="text" value={defaultValue} onChange={(e) => setDefaultValue(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="form-group">
                    <button type="submit">Save Custom Field</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default CustomFieldForm;

