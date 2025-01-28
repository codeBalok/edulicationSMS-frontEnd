import React, {useEffect, useContext, useState} from 'react'
import Sidebar from '../../components/SideBar'
import HierarchyContext from '../../contexts/HierarchyContext'
import api from '../../api'
import { Link } from 'react-router-dom'
import Nav from '../../components/Nav'
import CustomFieldRender from '../../components/CustomFieldRender'
  

const ProgramAdd = () => {

    const { state, dispatch } = useContext(HierarchyContext)

    const [parent, setParent] = useState(null);
    const [parentId, setParentId] = useState('');
    const [title, setTitle] = useState('');
    const [shortcode, setShortcode] = useState('');

    const [customFields, setCustomFields] = useState();
    const [formData, setFormData] = useState({});

 const getCustomField = async () => {
        const response = await api.fetchCustomField("AcademicCalendar")
        setCustomFields(response?.data)
        console.log("this is respnse of custom fields::::", response?.data)
    }


    const getParent = async () => {
        const response = await api.fetchProgramParent();
        setParent(response?.data.data)
        console.log(data)
    }

    const sendProgram = async (data) => {
        const response = await api.createProgram(data);
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
        const formData = {
            title: title,
            shortcode: shortcode,
             ...(parentId && parent && { parent_id: parentId }) 
        }
        sendProgram(formData)
    };

    return (
        <div className="flex h-screen">
           <Sidebar
                selectedItems = {state}
            />
            <main className="flex-1">
                <Nav link = "program" />
                  <form
            className="bg-white p-6 d w-[60%] mt-16"
            onSubmit={handleSubmit}
        >
            {/* Faculty Dropdown */}
           {
                parent !== null && (   
                 <div className="mb-4">
                                <label htmlFor="faculty" className="block text-sm font-medium text-gray-700">{ parent[0]?.model }<span className="text-red-500">*</span>
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
                    Shortcode <span className="text-red-500">*</span>
                </label>
                <input
                    id="shortcode"
                    name="shortcode"
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={shortcode}
                    onChange={(e) => setShortcode(e.target.value)}
                />
            </div>

                    <CustomFieldRender
                    customFields={customFields}  
                    onFieldChange={handleFieldChange} 
                    initialData={formData}       
          /> 
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

export default ProgramAdd

