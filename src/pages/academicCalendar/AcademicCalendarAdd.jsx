import React, {useEffect, useContext, useState} from 'react'
import Sidebar from '../../components/SideBar'
import HierarchyContext from '../../contexts/HierarchyContext'
import api from '../../api'
import { Link } from 'react-router-dom'
// import Nav from './Nav'
import Nav from '../../components/Nav'
import CustomFieldRender from '../../components/CustomFieldRender'


const AcademicCalendarAdd = () => {

  const { state, dispatch } = useContext(HierarchyContext)
  const [parent, setParent] = useState(null);
  const [parentId, setParentId] = useState("");
    
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-12-31");
  const [academicYear, setAcademicYear] = useState("2025-2026");
  const [holidays, setHolidays] = useState("Easter on 2025-04-14");
  const [events, setEvents] = useState("Sports Day on 2025-06-01");
  const [terms, setTerms] = useState("Spring term from 2025-01-01 to 2025-05-31");

  const [description, setDescription] = useState("");

   const [customFields, setCustomFields] = useState();
    const [formData, setFormData] = useState({});

 const getCustomField = async () => {
        const response = await api.fetchCustomField("AcademicCalendar")
        setCustomFields(response?.data)
        console.log("this is respnse of custom fields::::", response?.data)
    }

  
    const getParent = async () => {
        const response = await api.fetchAcademicCalendarParent();
        setParent(response?.data.data)
        console.log("data from sem:",response)
    }

    const sendAcademicCalendar = async (data) => {
        const response = await api.createAcademicCalendar(data);
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
       start_date: startDate,
      end_date: endDate,
      academic_year: academicYear,
      holidays,
      events,
      terms,
        description,
        ...(parentId && parent && { parent_id: parentId }),
      }
      console.log("AC::", formData)
      sendAcademicCalendar(formData)

    };

    return (
        <div className="flex h-screen">
           <Sidebar
                selectedItems = {state}
            />
            <main className="flex-1 overflow-y-auto">
          <Nav link = "academic-calendar" />
          
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

      {/* Academic Year */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Academic Year <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={academicYear}
          onChange={(e) => setAcademicYear(e.target.value)}
          placeholder="Enter academic year, e.g., 2025-2026"
        />
      </div>

      {/* Holidays */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Holidays <span className="text-red-500">*</span>
        </label>
        <textarea
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={holidays}
          onChange={(e) => setHolidays(e.target.value)}
          placeholder="Enter holiday details, e.g., Easter on 2025-04-14"
        ></textarea>
      </div>

      {/* Events */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Events <span className="text-red-500">*</span>
        </label>
        <textarea
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={events}
          onChange={(e) => setEvents(e.target.value)}
          placeholder="Enter event details, e.g., Sports Day on 2025-06-01"
        ></textarea>
      </div>

      {/* Terms */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Terms <span className="text-red-500">*</span>
        </label>
        <textarea
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={terms}
          onChange={(e) => setTerms(e.target.value)}
          placeholder="Enter term details, e.g., Spring term from 2025-01-01 to 2025-05-31"
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

export default AcademicCalendarAdd

