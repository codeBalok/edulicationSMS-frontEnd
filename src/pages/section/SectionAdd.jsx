import React, {useEffect, useContext, useState} from 'react'
import Sidebar from '../../components/SideBar'
import HierarchyContext from '../../contexts/HierarchyContext'
import api from '../../api'
import { Link } from 'react-router-dom'
import Nav from '../../components/Nav'
import CustomFieldRender from '../../components/CustomFieldRender'
  

const SectionAdd = () => {

  const { state, dispatch } = useContext(HierarchyContext)
  const [parent, setParent] = useState(null);
    
  const [title, setTitle] = useState("");
  const [parentId, setParentId] = useState("");
  const [seat, setSeat] = useState("");
  const [status, setStatus] = useState(1);

  const [customFields, setCustomFields] = useState();
    const [customFieldData, setCustomFieldData] = useState({});
    
 const getCustomField = async () => {
        const response = await api.fetchCustomField("Section")
        setCustomFields(response?.data)
        console.log("this is respnse of custom fields::::", response?.data)
      }
      
      const handleFieldChange = (updatedData) => {
              setCustomFieldData(updatedData); 
          };
  
    const getParent = async () => {
        const response = await api.fetchSectionParent();
        setParent(response?.data.data)
        console.log("data from sem:",response)
    }

    const sendSection = async (data) => {
        const response = await api.createSection(data);
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
            seat,
            status,
            ...(parentId && parent && { parent_id: parentId }),
            custom_field: result
          }
          sendSection(formData)
          
    };

    return (
        <div className="flex h-screen">
           <Sidebar
                selectedItems = {state}
            />
            <main className="flex-1 overflow-y-auto">
          <Nav link = "section" />
          
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

    {/* Seat Input */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">
      Seat<span className="text-red-500">*</span>
    </label>
    <input
      type="number"
      className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      value={seat}
      onChange={(e) => setSeat(e.target.value)}
    />
  </div>

  {/* Status Input */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">
      Status<span className="text-red-500">*</span>
    </label>
    <select
      className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value={1}>Active</option>
      <option value={0}>Inactive</option>
    </select>
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

export default SectionAdd

