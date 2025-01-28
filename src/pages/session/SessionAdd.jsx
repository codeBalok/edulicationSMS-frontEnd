import React, {useEffect, useContext, useState} from 'react'
import Sidebar from '../../components/SideBar'
import HierarchyContext from '../../contexts/HierarchyContext'
import api from '../../api'
import { Link } from 'react-router-dom'
import Nav from '../../components/Nav'
import CustomFieldRender from '../../components/CustomFieldRender'
 
          
const SessionAdd = () => {

    const { state, dispatch } = useContext(HierarchyContext)

    const [parent, setParent] = useState(null);
    const [parentId, setParentId] = useState('');
    
   const [title, setTitle] = useState("");
  const [eventId, setEventId] = useState("");
  const [location, setLocation] = useState("");
  const [rooms, setRooms] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dftStartHour, setDftStartHour] = useState("");
  const [dftStartMin, setDftStartMin] = useState("");
  const [dftStartAmPm, setDftStartAmPm] = useState("AM");
  const [endDate, setEndDate] = useState("");
  const [dftEndHour, setDftEndHour] = useState("");
  const [dftEndMin, setDftEndMin] = useState("");
  const [dftEndAmPm, setDftEndAmPm] = useState("AM");
   const [customFields, setCustomFields] = useState();
    const [formData, setFormData] = useState({});

 const getCustomField = async () => {
        const response = await api.fetchCustomField("AcademicCalendar")
        setCustomFields(response?.data)
        console.log("this is respnse of custom fields::::", response?.data)
    }
  
    const getParent = async () => {
        const response = await api.fetchSessionParent();
        setParent(response?.data.data)
        console.log(response)
    }

    const sendSession = async (data) => {
        const response = await api.createSession(data);
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
      title,
      event_id: eventId,
      location,
      rooms,
      start_date: startDate,
      dftstarthour: dftStartHour,
      dftstartmin: dftStartMin,
      dftstartampm: dftStartAmPm,
      end_date: endDate,
      dftendhour: dftEndHour,
      dftendmin: dftEndMin,
      dftendampm: dftEndAmPm,
      ...(parentId && parent && { parent_id: parentId }),
        }
      sendSession(formData)
      
      // console.log("session data::", formData)
    };

    return (
        <div className="flex h-screen">
           <Sidebar
                selectedItems = {state}
            />
            <main className="flex-1 overflow-y-auto">
              <Nav link = "session" />
          <form className="bg-white mt-16 p-6 w-[60%]" onSubmit={handleSubmit}>
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
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">Event ID<span className="text-red-500">*</span></label>
    <input
      type="number"
      className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      value={eventId}
      onChange={(e) => setEventId(e.target.value)}
    />
  </div>
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">Title<span className="text-red-500">*</span></label>
    <input
      type="text"
      className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  </div>

  {/* Location */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">Location<span className="text-red-500">*</span></label>
    <input
      type="text"
      className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
    />
  </div>

  {/* Rooms */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">Rooms<span className="text-red-500">*</span></label>
    <input
      type="text"
      className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      value={rooms}
      onChange={(e) => setRooms(e.target.value)}
    />
  </div>

  {/* Start Date */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">Start Date<span className="text-red-500">*</span></label>
    <input
      type="date"
      className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
    />
  </div>

  {/* Start Time */}
  <div className="flex space-x-2 mb-4">
    <input
      type="number"
      className="block w-16 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      placeholder="Hour"
      value={dftStartHour}
      onChange={(e) => setDftStartHour(e.target.value)}
    />
    <input
      type="number"
      className="block w-16 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      placeholder="Min"
      value={dftStartMin}
      onChange={(e) => setDftStartMin(e.target.value)}
    />
    <select
      className="block w-20 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      value={dftStartAmPm}
      onChange={(e) => setDftStartAmPm(e.target.value)}
    >
      <option value="AM">AM</option>
      <option value="PM">PM</option>
    </select>
  </div>

  {/* End Date */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">End Date<span className="text-red-500">*</span></label>
    <input
      type="date"
      className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
    />
  </div>

  {/* End Time */}
  <div className="flex space-x-2 mb-4">
    <input
      type="number"
      className="block w-16 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      placeholder="Hour"
      value={dftEndHour}
      onChange={(e) => setDftEndHour(e.target.value)}
    />
    <input
      type="number"
      className="block w-16 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      placeholder="Min"
      value={dftEndMin}
      onChange={(e) => setDftEndMin(e.target.value)}
    />
    <select
      className="block w-20 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      value={dftEndAmPm}
      onChange={(e) => setDftEndAmPm(e.target.value)}
    >
      <option value="AM">AM</option>
      <option value="PM">PM</option>
    </select>
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

export default SessionAdd

