import React, {useEffect, useContext, useState} from 'react'
import Sidebar from '../../components/SideBar'
import HierarchyContext from '../../contexts/HierarchyContext'
import api from '../../api'
import { Link } from 'react-router-dom'
import Nav from './Nav'

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

  
    const getParent = async () => {
        const response = await api.fetchCurriculumParent();
        setParent(response?.data.data)
        console.log("data from currr:",response)
    }

    const sendCurriculum = async (data) => {
        const response = await api.createCurriculum(data);
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
        start_date: startDate,
      end_date: endDate,
      version,
      approval_date: approvalDate,
      courses,
      learning_outcomes: learningOutcomes,
        description,
        ...(parentId && parent && { parent_id: parentId }),
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

export default CurriculumAdd

