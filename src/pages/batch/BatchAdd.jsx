import React, {useEffect, useContext, useState} from 'react'
import Sidebar from '../../components/SideBar'
import HierarchyContext from '../../contexts/HierarchyContext'
import api from '../../api'
import { Link } from 'react-router-dom'
import Nav from './Nav'

const BatchAdd = () => {

    const { state, dispatch } = useContext(HierarchyContext)

    const [parent, setParent] = useState(null);
    const [parentId, setParentId] = useState('');
    
  const [title, setTtitle] = useState("");
  const [startDate, setStartDate] = useState("");
  
    const getParent = async () => {
        const response = await api.fetchBatchParent();
        setParent(response?.data.data)
        console.log(response)
    }

    const sendBatch = async (data) => {
        const response = await api.createBatch(data);
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
      ...(parentId && parent && { parent_id: parentId }),
        }
    sendBatch(formData)
    };

    return (
        <div className="flex h-screen">
           <Sidebar
                selectedItems = {state}
            />
            <main className="flex-1 overflow-y-auto">
                <Nav />
                 <form className="bg-white mt-16 p-6 w-[60%]" onSubmit={handleSubmit}>
      {/* Parent Dropdown */}
      {parent !== null && (
        <div className="mb-4">
          <label
            htmlFor="parent"
            className="block text-sm font-medium text-gray-700"
                            >{ parent[0]?.model}<span className="text-red-500">*</span>
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

      {/* Input fields for all states */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={title}
          onChange={(e) => setTtitle(e.target.value)}
        />
      </div>

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

export default BatchAdd

