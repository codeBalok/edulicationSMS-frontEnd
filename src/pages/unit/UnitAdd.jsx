import React, {useEffect, useContext, useState} from 'react'
import Sidebar from '../../components/SideBar'
import HierarchyContext from '../../contexts/HierarchyContext'
import api from '../../api'
import { Link } from 'react-router-dom'
import Nav from './Nav'

const UnitAdd = () => {

  const { state, dispatch } = useContext(HierarchyContext)
  const [parent, setParent] = useState(null);
  const [parentId, setParentId] = useState("");
    
   const [title, setTitle] = useState("");
   const [learningHours, setLearningHours] = useState("");
   const [content, setContent] = useState("");
   const [resources, setResources] = useState("");
   const [assessments, setAssessments] = useState("");
   const [description, setDescription] = useState("");

  
    const getParent = async () => {
        const response = await api.fetchUnitParent();
        setParent(response?.data.data)
        console.log("data from sem:",response)
    }

    const sendUnit = async (data) => {
        const response = await api.createUnit(data);
        if (response.status !== 200 || response.status !== 200) {
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
        learning_hours: learningHours,
        content,
        resources,
        assessments,
        description,
        ...(parentId && parent && { parent_id: parentId }),
      }
      console.log("subj::", formData)
      sendUnit(formData)

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

   {/* Learning Hours */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Learning Hours <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={learningHours}
          onChange={(e) => setLearningHours(Number(e.target.value))}
        />
      </div>

      {/* Content */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Content <span className="text-red-500">*</span>
        </label>
        <textarea
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>

      {/* Resources */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Resources <span className="text-red-500">*</span>
        </label>
        <textarea
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={resources}
          onChange={(e) => setResources(e.target.value)}
        ></textarea>
      </div>

      {/* Assessments */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Assessments <span className="text-red-500">*</span>
        </label>
        <textarea
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={assessments}
          onChange={(e) => setAssessments(e.target.value)}
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

export default UnitAdd

