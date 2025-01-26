import React, {useEffect, useContext, useState} from 'react'
import Sidebar from '../../components/SideBar'
import HierarchyContext from '../../contexts/HierarchyContext'
import api from '../../api'
import { Link } from 'react-router-dom'
import Nav from './Nav'

const CourseAdd = () => {

    const { state, dispatch } = useContext(HierarchyContext)

    const [parent, setParent] = useState(null);
    const [parentId, setParentId] = useState('');
    
    const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [instituteId, setInstituteId] = useState("");
  const [courseCategoryId, setCourseCategoryId] = useState("");
  const [defaultCourseCost, setDefaultCourseCost] = useState("");
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [followUpEnquiry, setFollowUpEnquiry] = useState("");
  const [requiredNoOfUnit, setRequiredNoOfUnit] = useState("");
  const [coreUnit, setCoreUnit] = useState("");
  const [color, setColor] = useState("");
  const [reportingThisCourse, setReportingThisCourse] = useState("");
  const [tgaPackage, setTgaPackage] = useState("");
  const [status, setStatus] = useState("");
  const [selfPacedSessions, setSelfPacedSessions] = useState("");
  const [publicSessions, setPublicSessions] = useState("");
  const [privateSessions, setPrivateSessions] = useState("");

    const getParent = async () => {
        const response = await api.fetchCourseParent();
        setParent(response?.data.data)
        console.log(response)
    }

    const sendCourse = async (data) => {
        const response = await api.createCourse(data);
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
           code,
      name,
      ...(parentId && parent && { parent_id: parentId }),
      course_category_id: courseCategoryId,
      default_course_cost: defaultCourseCost,
      description,
      comments,
      delivery_method: deliveryMethod,
      follow_up_enquiry: followUpEnquiry,
      required_no_of_unit: requiredNoOfUnit,
      core_unit: coreUnit,
      color,
      reporting_this_course: reportingThisCourse,
      tga_package: tgaPackage,
      status,
      self_paced_sessions: selfPacedSessions,
      public_sessions: publicSessions,
      private_sessions: privateSessions,
        }
    sendCourse(formData)
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

      {/* Input fields for all states */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Code <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Course Category ID <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={courseCategoryId}
          onChange={(e) => setCourseCategoryId(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Default Course Cost <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={defaultCourseCost}
          onChange={(e) => setDefaultCourseCost(e.target.value)}
        />
        </div>
                    
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Delivery Method<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={deliveryMethod}
          onChange={(e) => setDeliveryMethod(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">FollowUp Enquiry<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={followUpEnquiry}
          onChange={(e) => setFollowUpEnquiry(e.target.value)}
        />
        </div>
                    
     <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
            Required No of Unit <span className="text-red-500">*</span>
        </label>
        <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={requiredNoOfUnit}
            onChange={(e) => setRequiredNoOfUnit(e.target.value)}
        />
    </div>
                    
    <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">
        Core Unit <span className="text-red-500">*</span>
    </label>
    <input
        type="text"
        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        value={coreUnit}
        onChange={(e) => setCoreUnit(e.target.value)}
    />
    </div>
                    
    <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">
        Color <span className="text-red-500">*</span>
    </label>
    <input
        type="text"
        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        value={color}
        onChange={(e) => setColor(e.target.value)}
    />
    </div>

    <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">
    Reporting This Course <span className="text-red-500">*</span>
  </label>
  <input
    type="text"
    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    value={reportingThisCourse}
    onChange={(e) => setReportingThisCourse(e.target.value)}
  />
</div>

    <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">
    TGA Package <span className="text-red-500">*</span>
  </label>
  <input
    type="text"
    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    value={tgaPackage}
    onChange={(e) => setTgaPackage(e.target.value)}
  />
</div>
    <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">Status<span className="text-red-500">*</span>
  </label>
  <input
    type="text"
    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    value={status}
    onChange={(e) => setStatus(e.target.value)}
  />
</div>


    <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">
    Self-Paced Sessions <span className="text-red-500">*</span>
  </label>
  <input
    type="text"
    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    value={selfPacedSessions}
    onChange={(e) => setSelfPacedSessions(e.target.value)}
  />
</div>

                    
  <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">
    Public Sessions <span className="text-red-500">*</span>
  </label>
  <input
    type="text"
    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    value={publicSessions}
    onChange={(e) => setPublicSessions(e.target.value)}
  />
</div>


<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">
    Private Sessions <span className="text-red-500">*</span>
  </label>
  <input
    type="text"
    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    value={privateSessions}
    onChange={(e) => setPrivateSessions(e.target.value)}
  />
</div>


    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      {/* Repeat similar input blocks for all remaining states */}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Comments
        </label>
        <textarea
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        ></textarea>
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

export default CourseAdd

