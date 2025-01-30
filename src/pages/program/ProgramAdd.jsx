import React, {useEffect, useContext, useState} from 'react'
import Sidebar from '../../components/Sidebar'
import HierarchyContext from '../../contexts/HierarchyContext'
import api from '../../api'
import { Link } from 'react-router-dom'
import Nav from '../../components/Nav'
import CustomFieldRender from '../../components/CustomFieldRender'
import { showToast } from '../../utils/toastUtils'
  

const ProgramAdd = () => {

    const { state, dispatch } = useContext(HierarchyContext)

    const [parent, setParent] = useState(null);
    const [parentId, setParentId] = useState('');
    const [title, setTitle] = useState('');
    const [shortcode, setShortcode] = useState('');

    const [customFields, setCustomFields] = useState();
    const [customFieldData, setCustomFieldsData] = useState({});
    const [errors, setErrors] = useState({});

    const getCustomField = async () => {
        const response = await api.fetchCustomField("Program")
        setCustomFields(response?.data)
        console.log("this is respnse of custom fields::::", response?.data)
    }

    const handleFieldChange = (updatedData) => {
        setCustomFieldsData(updatedData); 
    };


    const getParent = async () => {
        const response = await api.fetchProgramParent();
        setParent(response?.data.data)
        console.log(data)
    }

   const validateForm = () => {
    const newErrors = {};
    
    if (parent !== null && !parentId) {
        newErrors.parentId = `${parent[0]?.model} is required`;
    }
    
    if (!title.trim()) {
        newErrors.title = 'Title is required';
    }
    
    if (!shortcode.trim()) {
        newErrors.shortcode = 'Shortcode is required';
    }

    // Custom field validations
    customFields.forEach(field => {
        const value = customFieldData[field.id] || '';
        if (field.is_required && !value.trim()) {
            newErrors[field.id] = `${field.name} is required`;
        }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
   };

    const sendProgram = async (data) => {
        try {
            const response = await api.createProgram(data);
            showToast('success', 'Created', 'Program created successfully!');
        } catch (error) {
            
        }
    }

    useEffect(() => {
       getParent()
       getCustomField()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        const result = Object.entries(customFieldData).map(([id, value,]) => ({
            id: parseInt(id), 
            value,
          
        }));
        const formData = {
            title: title,
            shortcode: shortcode,
            ...(parentId && parent && { parent_id: parentId }),
             custom_field: result
        }
        sendProgram(formData)
    };

    return (
        <div className="flex h-screen">
           <Sidebar
                selectedItems = {state}
            />
            <main className="flex-1">
                <Nav link = "program" />
                  <form
            className="bg-white p-6 d w-[60%] mt-16"
            onSubmit={handleSubmit}
        >
            {/* Faculty Dropdown */}
           {
                parent !== null && (   
                 <div className="mb-4">
                                <label htmlFor="faculty" className="block text-sm font-medium text-gray-700">{ parent[0]?.model }<span className="text-red-500">*</span>
                </label>
                <select
                    id="faculty"
                    name="faculty"
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={parentId}
                    onChange={(e) => setParentId(e.target.value)}
                >
                    <option value="" disabled>
                        Select
                    </option>
                        {
                        parent?.map((data) => (
                            <option value={data?.id}>{ data?.title }</option>
                       ))            
                    }        
                </select>
                 {errors.parentId && (
                <p className="mt-1 text-sm text-red-500">{errors.parentId}</p>
            )}                   
            </div>)       
            }

            {/* Title Input */}
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title <span className="text-red-500">*</span>
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                )}                   
            </div>

            {/* Shortcode Input */}
            <div className="mb-4">
                <label htmlFor="shortcode" className="block text-sm font-medium text-gray-700">
                    Shortcode <span className="text-red-500">*</span>
                </label>
                <input
                    id="shortcode"
                    name="shortcode"
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={shortcode}
                    onChange={(e) => setShortcode(e.target.value)}
                />
                {errors.shortcode && (
                    <p className="mt-1 text-sm text-red-500">{errors.shortcode}</p>
                )}          
            </div>

                <CustomFieldRender
                    customFields={customFields}  
                    onFieldChange={handleFieldChange} 
                    initialData={customFieldData}  
                    errors={errors}        
               /> 
            {/* Save Button */}
            <div className="flex">
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 focus:ring-2 focus:ring-green-400"
                >
                    ✔ Save
                </button>
            </div>
        </form>
             </main>
        </div> 
  )
}

export default ProgramAdd

