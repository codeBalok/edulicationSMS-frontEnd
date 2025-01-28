import React, { useState, useEffect } from 'react';

const CustomFieldRender = ({ customFields = [], initialData = {}, onFieldChange, tableName, tableValue }) => {
    const [formData, setFormData] = useState(() => {
        const initialValues = customFields.reduce((acc, field) => {
            acc[field.id] = initialData[field.id] || (field.defaultValue || "");
            return acc;
        }, {});
        return initialValues;
    });

    useEffect(() => {
        setFormData(prevData => ({
            ...prevData,
            ...initialData,
        }));
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked, id } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        setFormData(prev => {
            const updatedData = { ...prev, [id]: newValue };
            if (onFieldChange) {
                onFieldChange(updatedData);
            }
            return updatedData;
        });
    };

    const renderField = (field) => {
        const { id, name, type, options, isRequired } = field;
        const parsedOptions = options ? JSON.parse(options) : [];

        switch (type) {
            case 'text':
            case 'number':
                return (
                    <div className="mb-4" key={id}>
                        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                            {name} {isRequired && <span className="text-red-500">*</span>}
                        </label>
                        <input
                            id={id}
                            name={name}
                            type={type}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={formData[id] || ""}
                            onChange={handleChange}
                            required={isRequired}
                        />
                    </div>
                );
            case 'select':
                return (
                    <div className="mb-4" key={id}>
                        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                            {name} {isRequired && <span className="text-red-500">*</span>}
                        </label>
                        <select
                            id={id}
                            name={name}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={formData[id] || ""}
                            onChange={handleChange}
                            required={isRequired}
                        >
                            <option value="">Select an option</option>
                            {parsedOptions.map((option, idx) => (
                                <option key={idx} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            case 'radio':
                return (
                    <div className="mb-4" key={id}>
                        <label className="block text-sm font-medium text-gray-700">
                            {name} {isRequired && <span className="text-red-500">*</span>}
                        </label>
                        {parsedOptions.map((option, idx) => (
                            <div key={idx} className="flex items-center">
                                <input
                                    id={`${id}-${option}`}
                                    type="radio"
                                    name={name}
                                    value={option}
                                    checked={formData[id] === option}
                                    onChange={handleChange}
                                    required={isRequired}
                                />
                                <label htmlFor={`${name}-${option}`} className="ml-2 text-sm">
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                );
            case 'checkbox':
                return (
                    <div className="mb-4" key={id}>
                        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                            {name} {isRequired && <span className="text-red-500">*</span>}
                        </label>
                        <input
                            id={id}
                            type="checkbox"
                            name={name}
                            checked={formData[id] || false}
                            onChange={handleChange}
                            className="mt-1 block w-4 h-4"
                            required={isRequired}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            {tableName && (
                <div className="mb-6">
                    <h2 className="text-xl font-bold">{tableName}</h2>
                    {tableValue && <p className="text-sm text-gray-600">{tableValue}</p>}
                </div>
            )}
            {customFields && customFields.length > 0 ? (
                customFields.map(field => renderField(field))
            ) : (
                <p>No custom fields available</p>
            )}
        </div>
    );
};

export default CustomFieldRender;