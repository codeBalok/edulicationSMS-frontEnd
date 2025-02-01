import React, {useEffect, useContext, useState} from 'react'
import Sidebar from '../../components/SideBar'
import HierarchyContext from '../../contexts/HierarchyContext'
import api from '../../api'
import { Link } from 'react-router-dom'
// import Nav from './Nav'
import Nav from '../../components/Nav'

import CustomFieldRender from '../../components/CustomFieldRender'
import { showToast } from '../../utils/toastUtils'


const AssessmentAdd = () => {

  const { state, dispatch } = useContext(HierarchyContext)
  const [parent, setParent] = useState(null);
  const [parentId, setParentId] = useState("");
    
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [totalMarks, setTotalMarks] = useState();
  const [passingMarks, setPassingMarks] = useState();
  const [date, setDate] = useState("2025-01-21 21:26:22");
  const [time, setTime] = useState("2025-01-21 21:26:22");
  const [duration, setDuration] = useState();
  const [weightage, setWeightage] = useState();
  const [instructions, setInstructions] = useState("");
  const [rubric, setRubric] = useState("");
  const [description, setDescription] = useState("");
  const [customFields, setCustomFields] = useState();
  const [customFieldData, setCustomFieldData] = useState({});
  const [errors, setErrors] = useState({})

 

  const getCustomField = async () => {
        const response = await api.fetchCustomField("Assessment")
        setCustomFields(response?.data)
        console.log("this is respnse of custom fields::::", response?.data)
  }

  const handleFieldChange = (updatedData) => {
    setCustomFieldData(updatedData); 
  };


  
    const getParent = async () => {
        const response = await api.fetchAssessmentParent();
        setParent(response?.data.data)
        console.log("data from sem:",response)
    }

  const sentAssessment = async (data) => {
      try {
        const response = await api.createAssessment(data);
        showToast('success', 'Created', 'Assessment created successfully!');
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
  
    if (!type.trim()) {
        newErrors.type = 'Type is required';
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
        type,
        total_marks: totalMarks,
        passing_marks: passingMarks,
        date,
        time,
        duration,
        weightage,
        instructions,
        rubric,
        description,
        ...(parentId && parent && { parent_id: parentId }),
         custom_field: result
      }
      console.log("subj::", formData)
      sentAssessment(formData)

    };

    return (
        <div className="flex h-screen">
           <Sidebar
                selectedItems = {state}
            />
            <main className="flex-1 overflow-y-auto">
          <Nav link= "assessment" />
          
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

     {/* Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Type <span className="text-red-500">*</span>
        </label>
        <select
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="exam">Exam</option>
          <option value="assignment">Assignment</option>
          <option value="project">Project</option>
          <option value="quiz">Quiz</option>
        </select>
         {
        errors?.type && (
          <p className='mt-1 text-sm text-red-500'>{ errors?.type}</p>        
        )        
      }        
      </div>

      {/* Total Marks */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Total Marks <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={totalMarks}
          onChange={(e) => setTotalMarks(Number(e.target.value))}
        />
      </div>

      {/* Passing Marks */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Passing Marks <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={passingMarks}
          onChange={(e) => setPassingMarks(Number(e.target.value))}
        />
      </div>

      {/* Date */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Date <span className="text-red-500">*</span>
        </label>
        <input
          type="datetime-local"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Time */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Time <span className="text-red-500">*</span>
        </label>
        <input
          type="datetime-local"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      {/* Duration */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Duration (minutes) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
      </div>

      {/* Weightage */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Weightage (%) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={weightage}
          onChange={(e) => setWeightage(Number(e.target.value))}
        />
      </div>

      {/* Instructions */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Instructions <span className="text-red-500">*</span>
        </label>
        <textarea
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        ></textarea>
      </div>

      {/* Rubric */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Rubric <span className="text-red-500">*</span>
        </label>
        <textarea
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={rubric}
          onChange={(e) => setRubric(e.target.value)}
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
          <p className='mt-1 text-sm text-red-500'>{ errors?.description}</p>        
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

export default AssessmentAdd

