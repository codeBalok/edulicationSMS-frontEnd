import React, {useEffect, useContext, useState} from 'react'
import Sidebar from '../../components/SideBar'
import HierarchyContext from '../../contexts/HierarchyContext'
import api from '../../api'
import { Link } from 'react-router-dom'
import Nav from '../../components/Nav'
import CustomFieldRender from '../../components/CustomFieldRender'
import { showToast } from '../../utils/toastUtils'
  

const LearningOutcomeAdd = () => {

  const { state, dispatch } = useContext(HierarchyContext)
  const [parent, setParent] = useState(null);
  const [parentId, setParentId] = useState("");
    
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [assessmentMethods, setAssessmentMethods] = useState("");
  const [performanceCriteria, setPerformanceCriteria] = useState("");
  const [mapping, setMapping] = useState("");
  const [description, setDescription] = useState("");

  const [customFields, setCustomFields] = useState();
  const [customFieldData, setCustomFieldData] = useState({});
  const [errors, setErrors] = useState({}) 

 const getCustomField = async () => {
   const response = await api.fetchCustomField("LearningOutcome")
   setCustomFields(response?.data)
   console.log("this is respnse of custom fields::::", response?.data)
  }
  
  const handleFieldChange = (updatedData) => {
          setCustomFieldData(updatedData); 
      };
  
    const getParent = async () => {
        const response = await api.fetchLearningOutcomeParent();
        setParent(response?.data.data)
        console.log("data from sem:",response)
    }

  const sendLearningOutcomes = async (data) => {
      try {
        const response = await api.createLearningOutcome(data);
        showToast('success', 'Created', 'Learning Outcomes created successfully!');
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
  
    // if (!startDate.trim()) {
    //     newErrors.startDate = 'Start Date is required';
    // }
    // if (!endDate.trim()) {
    //     newErrors.endDate = 'End Date is required';
    // }
    // if (!courses.trim()) {
    //     newErrors.courses = 'Courses is required';
    // }
   
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
       level,
      assessment_methods: assessmentMethods,
      performance_criteria: performanceCriteria,
      mapping,
        description,
        ...(parentId && parent && { parent_id: parentId }),
        custom_field: result
      }
      console.log("Outcomesss::", formData)
      sendLearningOutcomes(formData)

    };

    return (
        <div className="flex h-screen">
           <Sidebar
                selectedItems = {state}
            />
            <main className="flex-1 overflow-y-auto">
           <Nav link = "learning-outcome" />
          
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

    {/* Level Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Level <span className="text-red-500">*</span>
        </label>
        <select
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="basic">Basic</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {/* Status Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Status <span className="text-red-500">*</span>
        </label>
        <select
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Assessment Methods */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Assessment Methods <span className="text-red-500">*</span>
        </label>
        <textarea
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={assessmentMethods}
          onChange={(e) => setAssessmentMethods(e.target.value)}
          placeholder="Enter assessment methods, e.g., Tests, Assignments"
        ></textarea>
      </div>

      {/* Performance Criteria */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Performance Criteria <span className="text-red-500">*</span>
        </label>
        <textarea
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={performanceCriteria}
          onChange={(e) => setPerformanceCriteria(e.target.value)}
          placeholder="Enter performance criteria, e.g., Meet 75% of learning outcomes"
        ></textarea>
      </div>

      {/* Mapping */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Mapping <span className="text-red-500">*</span>
        </label>
        <textarea
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={mapping}
          onChange={(e) => setMapping(e.target.value)}
          placeholder="Enter mapping, e.g., Mapped to programming fundamentals"
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

export default LearningOutcomeAdd

