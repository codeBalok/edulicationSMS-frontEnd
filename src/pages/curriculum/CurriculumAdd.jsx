import React, {useEffect, useContext, useState} from 'react'
import Sidebar from '../../components/SideBar'
import HierarchyContext from '../../contexts/HierarchyContext'
import api from '../../api'
import { Link } from 'react-router-dom'
import Nav from '../../components/Nav'
import CustomFieldRender from '../../components/CustomFieldRender'
import { showToast } from '../../utils/toastUtils'


const CurriculumAdd = () => {

  const { state, dispatch } = useContext(HierarchyContext)
  const [parent, setParent] = useState(null);
  const [parentId, setParentId] = useState("");
    
  const [title, setTitle] = useState("");

  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-12-31");
  const [version, setVersion] = useState("1.0");
  const [approvalDate, setApprovalDate] = useState("2025-01-15");
  const [courses, setCourses] = useState("");
  const [learningOutcomes, setLearningOutcomes] = useState("");

  const [description, setDescription] = useState("");

  const [customFields, setCustomFields] = useState();
  const [customFieldData, setCustomFieldData] = useState({});
  const [errors, setErrors] = useState({})

  
 const getCustomField = async () => {
        const response = await api.fetchCustomField("Curriculum")
        setCustomFields(response?.data)
        console.log("this is respnse of custom fields::::", response?.data)
    }
    
    const handleFieldChange = (updatedData) => {
            setCustomFieldData(updatedData); 
        };
  
    const getParent = async () => {
        const response = await api.fetchCurriculumParent();
        setParent(response?.data.data)
        console.log("data from currr:",response)
    }

  const sendCurriculum = async (data) => {
      try {
        const response = await api.createCurriculum(data);
        showToast('success', 'Created', 'Curriculum created successfully!');
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
  
    if (!startDate.trim()) {
        newErrors.startDate = 'Start Date is required';
    }
    if (!endDate.trim()) {
        newErrors.endDate = 'End Date is required';
    }
    if (!courses.trim()) {
        newErrors.courses = 'Courses is required';
    }
   
    if (!description.trim()) {
        newErrors.description = 'Description is required';
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
        start_date: startDate,
        end_date: endDate,
        version,
        approval_date: approvalDate,
        courses,
        learning_outcomes: learningOutcomes,
        description,
        ...(parentId && parent && { parent_id: parentId }),
        custom_field: result
      }
      console.log("CUrr::", formData)
      sendCurriculum(formData)

    };

    return (
        <div className="flex h-screen">
           <Sidebar
                selectedItems = {state}
            />
            <main className="flex-1 overflow-y-auto">
          <Nav link = "curriculum" />
          
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
                    <p className='mt-1 text-sm text-red-500'>{errors?.parentId}</p>        
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
        <p className='mt-1 text-sm text-red-500'>{errors?.title}</p>        
        )        
      }           
  </div>

    {/* Start Date */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Start Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
              />
               {
      errors?.startDate && (
        <p className='mt-1 text-sm text-red-500'>{errors?.startDate}</p>        
        )        
      }  
      </div>

      {/* End Date */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          End Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
              />
               {
      errors?.endDate && (
        <p className='mt-1 text-sm text-red-500'>{errors?.endDate}</p>        
        )        
      }  
      </div>

      {/* Version */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Version <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
        />
      </div>

      {/* Approval Date */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Approval Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={approvalDate}
          onChange={(e) => setApprovalDate(e.target.value)}
        />
      </div>

      {/* Courses */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Courses <span className="text-red-500">*</span>
        </label>
        <textarea
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={courses}
          onChange={(e) => setCourses(e.target.value)}
          placeholder="Enter course codes separated by commas, e.g., CS101, CS102, CS103"
              ></textarea>
               {
      errors?.courses && (
        <p className='mt-1 text-sm text-red-500'>{errors?.courses}</p>        
        )        
      }  
      </div>

      {/* Learning Outcomes */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Learning Outcomes <span className="text-red-500">*</span>
        </label>
        <textarea
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={learningOutcomes}
          onChange={(e) => setLearningOutcomes(e.target.value)}
          placeholder="Enter learning outcomes separated by commas, e.g., Critical thinking, Problem-solving"
        ></textarea>
      </div>

  {/* Description Input */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">
      Description
    </label>
    <textarea
      className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
     {
      errors?.description && (
        <p className='mt-1 text-sm text-red-500'>{errors?.description}</p>        
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

export default CurriculumAdd

