import React, {useEffect, useContext, useState} from 'react'
import Sidebar from '../../components/SideBar'
import HierarchyContext from '../../contexts/HierarchyContext'
import api from '../../api'
import { Link } from 'react-router-dom'
import Nav from '../../components/Nav'
import CustomFieldRender from '../../components/CustomFieldRender'
import { showToast } from '../../utils/toastUtils'
 

const EventAdd = () => {

  const { state, dispatch } = useContext(HierarchyContext)
  const [parent, setParent] = useState(null);
  const [parentId, setParentId] = useState("");
    
const [title, setTitle] = useState("");
const [courseType, setCourseType] = useState("Online Training");
const [reportingState, setReportingState] = useState("Active");
const [courseName, setCourseName] = useState("Advanced PHP");
const [group, setGroup] = useState("Developers");
const [trainers, setTrainers] = useState("John Doe, Jane Doe");
const [assessors, setAssessors] = useState("John Smith");
const [month, setMonth] = useState("January");
const [year, setYear] = useState("2025");
const [courseQuota, setCourseQuota] = useState("50");
const [courseCost, setCourseCost] = useState("500 USD");
const [city, setCity] = useState("Addis Ababa");
const [location, setLocation] = useState("Main Office");
const [resources, setResources] = useState("Laptop, Projector");
const [selectUnits, setSelectUnits] = useState("Unit A, Unit B");
const [deliveryMode, setDeliveryMode] = useState("Online");
const [predominantDeliveryMode, setPredominantDeliveryMode] = useState("Self-paced");
const [archive, setArchive] = useState("Archived");


  const [description, setDescription] = useState("");

  const [customFields, setCustomFields] = useState();
  const [customFieldData, setCustomFieldData] = useState({});
  
  const [errors, setErrors] = useState({})
  
  
  const getCustomField = async () => {
    const response = await api.fetchCustomField("Event")
        setCustomFields(response?.data)
        console.log("this is respnse of custom fields::::", response?.data)
      }
      
      const handleFieldChange = (updatedData) => {
        setCustomFieldData(updatedData); 
          };
  
    const getParent = async () => {
        const response = await api.fetchEventParent();
        setParent(response?.data.data)
        console.log("data from sem:",response)
      }

  const sendEvent = async (data) => {
        try {
          const response = await api.createEvent(data);
            showToast('success', 'Created', 'Event created successfully!');

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
      course_type: courseType,
      reporting_state: reportingState,
      course_name: courseName,
      group,
      trainers,
      assessors,
      month,
      year,
      course_quota: courseQuota,
      course_cost: courseCost,
      city,
      location,
      resources,
      selects_units: selectUnits,
      delivery_mode: deliveryMode,
      predominant_delivery_mode: predominantDeliveryMode,
      ...(parentId && parent && { parent_id: parentId }),
      custom_field: result
    }
      console.log("EVT::", formData)
      sendEvent(formData)

    };

    return (
        <div className="flex h-screen">
           <Sidebar
                selectedItems = {state}
            />
            <main className="flex-1 overflow-y-auto">
          <Nav link = "event" />
          
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

    {/* Course Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Course Type</label>
        <input
          type="text"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={courseType}
          onChange={(e) => setCourseType(e.target.value)}
        />
      </div>

      {/* Reporting State */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Reporting State</label>
        <input
          type="text"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={reportingState}
          onChange={(e) => setReportingState(e.target.value)}
        />
      </div>

      {/* Course Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Course Name</label>
        <input
          type="text"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
      </div>

      {/* Group */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Group</label>
        <input
          type="text"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        />
      </div>

      {/* Trainers */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Trainers</label>
        <input
          type="text"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={trainers}
          onChange={(e) => setTrainers(e.target.value)}
        />
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

export default EventAdd

