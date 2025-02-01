import React, {useEffect, useContext, useState} from 'react'
import Sidebar from '../../components/SideBar'
import HierarchyContext from '../../contexts/HierarchyContext'
import api from '../../api'
import { Link } from 'react-router-dom'
import Nav from '../../components/Nav'
import CustomFieldRender from '../../components/CustomFieldRender'
import { showToast } from '../../utils/toastUtils'
import React from 'react'


const SemesterAdd = () => {

  const { state, dispatch } = useContext(HierarchyContext)
  const [parent, setParent] = useState(null);
    
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [parentId, setParentId] = useState("");
  const [customFields, setCustomFields] = useState();
  const [customFieldData, setCustomFieldData] = useState({});
   const [errors, setErrors] = useState({})
   
   const getCustomField = async () => {
     const response = await api.fetchCustomField("Semester")
        setCustomFields(response?.data)
        console.log("this is respnse of custom fields::::", response?.data)
    }

        const handleFieldChange = (updatedData) => {
                setCustomFieldData(updatedData); 
            };
  
    const getParent = async () => {
        const response = await api.fetchSemesterParent();
        setParent(response?.data.data)
        console.log("data from sem:",response)
      }
      
  const sendSemester = async (data) => {
        try {
          const response = await api.createSemester(data);
          showToast('success', 'Created', 'Semester created successfully!');
        } catch (error) {
          
        }
      }
      
      useEffect(() => {
        getParent()
       getCustomField()
    }, [])
    
    const validateForm = () => {
        const newErrors = {};
        
        if (parent !== null && !parentId) {
            newErrors.parentId = `${parent[0]?.model} is required`;
        }
        
        if (!title.trim()) {
            newErrors.title = 'Title is required';
        }
      
        if (!year.trim()) {
            newErrors.year = 'Year is required';
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
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
                return;
              }
       const result = Object.entries(customFieldData).map(([id, value]) => ({
     id: parseInt(id), 
     value,
    }));
      
      const formData = {
            title,
            year,
          ...(parentId && parent && { parent_id: parentId }),
          custom_field: result
        }
        sendSemester(formData)
        
      // console.log("session data::", formData)
    };

    return (
        <div className="flex h-screen">
           <Sidebar
                selectedItems = {state}
            />
            <main className="flex-1 overflow-y-auto">
        <Nav link = "semester" />
          
          <form className="bg-white mt-16 p-6 w-[60%]" onSubmit={handleSubmit}>

             {parent !== null && (
        <div className="mb-4">
          <label
            htmlFor="parent"
            className="block text-sm font-medium text-gray-700">{ parent[0]?.model}<span className="text-red-500">*</span>
          </label>
          <select
            id="parent"
            name="parent"
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
          >
            <option value="" disabled>
              Select
            </option>
            {parent?.map((data) => (
              <option key={data?.id} value={data?.id}>
                {data?.title}
              </option>
            ))}
        </select>
        {
          errors?.parentId && (
                    <p className='mt-1 text-sm text-red-500'>{ errors?.parentId}</p>          
           )          
        }        
        </div>
      )}
  {/* Title Field */}
  <div className="mb-4">
    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
      Title<span className="text-red-500">*</span>
    </label>
    <input
      id="title"
      type="text"
      className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
    {
          errors?.title && (
                    <p className='mt-1 text-sm text-red-500'>{ errors?.title}</p>          
           )          
        }            
  </div>

  {/* Year Field */}
  <div className="mb-4">
    <label htmlFor="year" className="block text-sm font-medium text-gray-700">
      Year<span className="text-red-500">*</span>
    </label>
    <input
      id="year"
      type="number"
      className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      value={year}
      onChange={(e) => setYear(e.target.value)}
    />
     {
          errors?.year && (
                    <p className='mt-1 text-sm text-red-500'>{ errors?.year}</p>          
           )          
        }           
  </div>
            
           <CustomFieldRender
                    customFields={customFields}  
                    onFieldChange={handleFieldChange} 
              initialData={customFieldData}  
              errors={errors}
          /> 

  {/* Submit Button */}
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

export default SemesterAdd

