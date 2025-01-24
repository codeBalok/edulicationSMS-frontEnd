import React, {useEffect, useContext, useState} from 'react'
import Sidebar from '../../components/SideBar'
import HierarchyContext from '../../contexts/HierarchyContext'
import api from '../../api'
import { Link } from 'react-router-dom'
import Nav from './Nav'

const ClassYearAdd = () => {

  const { state, dispatch } = useContext(HierarchyContext)
  const [parent, setParent] = useState(null);
  const [parentId, setParentId] = useState("");
    
  const [title, setTitle] = useState("");
  const [yearNumber, setYearNumber] = useState(2025);
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-12-31");
  const [academicYear, setAcademicYear] = useState("2025-2026");
  const [intake, setIntake] = useState("fall");
  const [description, setDescription] = useState("");

  
    const getParent = async () => {
        const response = await api.fetchClassYearParent();
        setParent(response?.data.data)
        console.log("data from sem:",response)
    }

    const sendClassYear = async (data) => {
        const response = await api.createClassYear(data);
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
        year_number: yearNumber,
        start_date: startDate,
        end_date: endDate,
        academic_year: academicYear,
        intake: intake,
        description,
        ...(parentId && parent && { parent_id: parentId }),
      }
      sendClassYear(formData)

    };

    return (
        <div className="flex h-screen">
           <Sidebar
                selectedItems = {state}
            />
            <main className="flex-1 overflow-y-auto">
          <Nav />
          
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

  {/* Year Number Input */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">
      Year Number<span className="text-red-500">*</span>
    </label>
    <input
      type="number"
      className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      value={yearNumber}
      onChange={(e) => setYearNumber(e.target.value)}
    />
  </div>

  {/* Start Date Picker */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">
      Start Date<span className="text-red-500">*</span>
    </label>
    <input
      type="date"
      className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
    />
  </div>

  {/* End Date Picker */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">
      End Date<span className="text-red-500">*</span>
    </label>
    <input
      type="date"
      className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
    />
  </div>

  {/* Academic Year Input */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">
      Academic Year<span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      value={academicYear}
      onChange={(e) => setAcademicYear(e.target.value)}
    />
  </div>

  {/* Intake Dropdown */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">
      Intake<span className="text-red-500">*</span>
    </label>
    <select
      className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      value={intake}
      onChange={(e) => setIntake(e.target.value)}
    >
      <option value="" disabled>
        Select Intake
      </option>
      <option value="fall">Fall</option>
      <option value="spring">Spring</option>
      <option value="summer">Summer</option>
    </select>
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

export default ClassYearAdd

