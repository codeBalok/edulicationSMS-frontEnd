import React, {useEffect, useContext, useState} from 'react'
import Sidebar from '../../components/SideBar'
import HierarchyContext from '../../contexts/HierarchyContext'
import api from '../../api'
import { Link } from 'react-router-dom'
import Nav from '../../components/Nav'
import CustomFieldRender from '../../components/CustomFieldRender'
  

const SubjectAdd = () => {

  const { state, dispatch } = useContext(HierarchyContext)
  const [parent, setParent] = useState(null);
  const [parentId, setParentId] = useState("");
    
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [creditHour, setCreditHour] = useState();
  const [subjectType, setSubjectType] = useState();
  const [classType, setClassType] = useState();
  const [totalMarks, setTotalMarks] = useState();
  const [passingMarks, setPassingMarks] = useState();
  const [description, setDescription] = useState("");

  const [customFields, setCustomFields] = useState();
  const [customFieldData, setCustomFieldData] = useState({});
 
 const getCustomField = async () => {
        const response = await api.fetchCustomField("Subject")
        setCustomFields(response?.data)
        console.log("this is respnse of custom fields::::", response?.data)
      } 
      
      const handleFieldChange = (updatedData) => {
              setCustomFieldData(updatedData); 
          };
  
    const getParent = async () => {
        const response = await api.fetchSubjectParent();
        setParent(response?.data.data)
        console.log("data from sem:",response)
    }

    const sendSubject = async (data) => {
        const response = await api.createSubject(data);
        if (response.status !== 201) {
            alert("failed to add program")
        }
    }

    useEffect(() => {
       getParent()
       getCustomField()
    }, [])

    const handleSubmit = (e) => {
      e.preventDefault();
      const result = Object.entries(customFieldData).map(([id, value]) => ({
            id: parseInt(id), 
            value,
        }));          
    const formData = {
        title,
        code,
        credit_hour: creditHour,
        subject_type: subjectType,
        class_type: classType,
        total_marks: totalMarks,
        passing_marks: passingMarks,
        description,
        ...(parentId && parent && { parent_id: parentId }),
        custom_field: result
      }
      console.log("subj::", formData)
      sendSubject(formData)

    };

    return (
        <div className="flex h-screen">
           <Sidebar
                selectedItems = {state}
            />
            <main className="flex-1 overflow-y-auto">
         <Nav link = "subject" />
          
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
  </div>

   {/* Code */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Code <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      {/* Credit Hour */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Credit Hour <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={creditHour}
          onChange={(e) => setCreditHour(Number(e.target.value))}
        />
      </div>

      {/* Subject Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Subject Type <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={subjectType}
          onChange={(e) => setSubjectType(Number(e.target.value))}
        />
      </div>

      {/* Class Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Class Type <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={classType}
          onChange={(e) => setClassType(Number(e.target.value))}
        />
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
  </div>
<CustomFieldRender
                    customFields={customFields}  
                    onFieldChange={handleFieldChange} 
                    initialData={customFieldData}       
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

export default SubjectAdd

