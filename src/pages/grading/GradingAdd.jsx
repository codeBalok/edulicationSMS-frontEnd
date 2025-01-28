import React, {useEffect, useContext, useState} from 'react'
import Sidebar from '../../components/SideBar'
import HierarchyContext from '../../contexts/HierarchyContext'
import api from '../../api'
import { Link } from 'react-router-dom'
import Nav from '../../components/Nav'
import CustomFieldRender from '../../components/CustomFieldRender'
 

const GradingAdd = () => {

  const { state, dispatch } = useContext(HierarchyContext)
  const [parent, setParent] = useState(null);
  const [parentId, setParentId] = useState("");
    
  const [title, setTitle] = useState("");
  const [gradePoints, setGradePoints] = useState();
  const [minMarks, setMinMarks] = useState();
  const [maxMarks, setMaxMarks] = useState();
  const [gradeLetter, setGradeLetter] = useState("");
  const [gradeDescription, setGradeDescription] = useState("");
  const [gradeValue, setGradeValue] = useState();
  const [gradeRange, setGradeRange] = useState("");
  const [description, setDescription] = useState("");

   const [customFields, setCustomFields] = useState();
    const [formData, setFormData] = useState({});

 const getCustomField = async () => {
        const response = await api.fetchCustomField("AcademicCalendar")
        setCustomFields(response?.data)
        console.log("this is respnse of custom fields::::", response?.data)
    }



  useEffect(() => {
console.log("grading ::", parent)
  },[parent])
  
    const getParent = async () => {
        const response = await api.fetchGradingParent();
        setParent(response?.data.data)
        console.log("data from sem:",response)
    }

    const sentGrading = async (data) => {
        const response = await api.createGrading(data);
        if (response.status !== 201) {
            alert("failed to add program")
        }
    }

    useEffect(() => {
       getParent()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
      
      const formData = {
        title,
       grade_points: gradePoints,
      min_marks: minMarks,
      max_marks: maxMarks,
      grade_letter: gradeLetter,
      grade_value: gradeValue,
      grade_range: gradeRange,
        grade_description: description,
        ...(parentId && parent && { parent_id: parentId }),
      }
      console.log("Grading::", formData)
      sentGrading(formData)

    };

    return (
        <div className="flex h-screen">
           <Sidebar
                selectedItems = {state}
            />
            <main className="flex-1 overflow-y-auto">
          <Nav link = "grading" />
          
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

     {/* Grade Points */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Grade Points <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={gradePoints}
          onChange={(e) => setGradePoints(Number(e.target.value))}
        />
      </div>

      {/* Min Marks */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Minimum Marks <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={minMarks}
          onChange={(e) => setMinMarks(Number(e.target.value))}
        />
      </div>

      {/* Max Marks */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Maximum Marks <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={maxMarks}
          onChange={(e) => setMaxMarks(Number(e.target.value))}
        />
      </div>

      {/* Grade Letter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Grade Letter <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={gradeLetter}
          onChange={(e) => setGradeLetter(e.target.value)}
        />
      </div>

      {/* Grade Value */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Grade Value <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={gradeValue}
          onChange={(e) => setGradeValue(Number(e.target.value))}
        />
      </div>

      {/* Grade Range */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Grade Range <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={gradeRange}
          onChange={(e) => setGradeRange(e.target.value)}
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
                    initialData={formData}       
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

export default GradingAdd

