import React, {useEffect, useContext, useState} from 'react'
import Sidebar from '../../components/SideBar'
import HierarchyContext from '../../contexts/HierarchyContext'
import api from '../../api'
import { Link } from 'react-router-dom'
import Nav from './Nav'

const FacultyAdd = () => {

    const { state, dispatch } = useContext(HierarchyContext)

    const [parent, setParent] = useState(null);
    const [parentId, setParentId] = useState('');
    const [title, setTitle] = useState('');
    const [shortcode, setShortcode] = useState('');

    const getParent = async () => {
        const response = await api.fetchFacultiesParent();
        setParent(response?.data.data)
        
    }

    useEffect(() => {

        console.log("this is faculty parent::",parent)
    },[[parent]])


    const sendFaculty = async (data) => {
        const response = await api.createFaculties(data);
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
            title: title,
            shortcode: shortcode,
            ...(parentId && parent && { parent_id: parentId }) 
        }
        sendFaculty(formData)
    };

    return (
        <div className="flex h-screen">
           <Sidebar
                selectedItems = {state}
            />
            <main className="flex-1">
               <Nav />
                  <form
            className="bg-white p-6 d w-[60%] mt-16"
            onSubmit={handleSubmit}
        >
                    {/* Faculty Dropdown */}
           {
                parent !== null && (   
                 <div className="mb-4">
                <label htmlFor="faculty" className="block text-sm font-medium text-gray-700">
                    Faculty <span className="text-red-500">*</span>
                </label>
                <select
                    id="faculty"
                    name="faculty"
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={parentId}
                    onChange={(e) => setParentId(e.target.value)}
                >
                    <option value="" disabled>
                        Select
                    </option>
                        {
                        parent?.map((data) => (
                            <option value={data?.id}>{ data?.title }</option>
                       ))            
                    }        
                </select>
            </div>)       
            }
            {/* Title Input */}
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title <span className="text-red-500">*</span>
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            {/* Shortcode Input */}
            <div className="mb-4">
                <label htmlFor="shortcode" className="block text-sm font-medium text-gray-700">
                    ShortCode <span className="text-red-500">*</span>
                </label>
                <input
                    id="shortcode"
                    name="description"
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={shortcode}
                    onChange={(e) => setShortcode(e.target.value)}
                 >
                </input>        
                {/* <input
                    id="shortcode"
                    name="description"
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={description}
                    onChange={(e) => setShortcode(e.target.value)}
                /> */}
            </div>

            {/* Save Button */}
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

export default FacultyAdd

