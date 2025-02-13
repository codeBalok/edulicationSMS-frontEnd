import React, {useEffect, useContext, useState} from 'react'
import Sidebar from '../../components/Sidebar'
import HierarchyContext from '../../contexts/HierarchyContext'
import api from '../../api'
import { Link } from 'react-router-dom'
import { parentExtractor, captalize } from '../../utils/stringUtils'
// import Nav from './Nav'
import Nav from '../../components/Nav'
import { BiSolidEdit } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'

const ClassRoomList = () => {

    const { state, dispatch } = useContext(HierarchyContext)

    const [program, setProgram] = useState();
    const [parent, setParent] = useState();
    const [customField, setCustomField] = useState()  

    const getClassRoom = async () => {
        const data = await api.fetchClassRoom();
        const model = parentExtractor(data.data[0]?.parent_type)
        setProgram(data.data?.class_room)
        setCustomField(data.data?.custom_field)
        setParent(model)
    }
    useEffect(() => {
        getClassRoom()
    
    }, [])

   
    return (
        <div className="flex h-screen">
           <Sidebar
                selectedItems = {state}
            />
            <main className="flex-1">

                <Nav link = "class-room" />
                
                <div className="overflow-x-auto mt-32 bg-white shadow px-4">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-500">
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-white">#</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-white">ClassRoom</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-white">Floor</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-white">Capacity</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-white">{ parent }</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-white">Status</th>
                         {
                            customField !== null &&  
                            customField?.map((data) => (
                                <th className="px-4 py-2 text-left text-sm font-medium text-white">{ captalize(data.name)}</th>
                            ))        
                        }          
                        <th className="px-4 py-2 text-left text-sm font-medium text-white">Actions</th>
                        
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {program?.map((data, index ) => (
                        <tr key={data.id}>
                            <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                            <td className="px-4 py-2 text-sm text-gray-700">{data?.title}</td>
                            <td className="px-4 py-2 text-sm text-gray-700">{data?.floor}</td>
                            <td className="px-4 py-2 text-sm text-gray-700">{data?.capacity}</td>
                            <td className="px-4 py-2 text-sm text-gray-700">{data?.parent?.title}</td>
                            <td className="px-4 py-2 text-sm">
                                <span
                                    className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                                        data.status ?
                                            "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {data.status ? "Active": "Not Active"}
                                </span>
                            </td>
                            {
                                customField.map((customFieldData) => {
                                    const customFieldValue = data.custom_field_values?.find(
                                                            (cfv) => cfv.custom_field_id === customFieldData.id
                                                        );

                                return (
                                    <td key={customField.id} className="px-4 py-2 text-sm text-gray-500">
                                        {customFieldValue ? customFieldValue.value : 'N/A'}
                                    </td>
                                );
                            })}
                                <td className="px-4 py-2 text-sm">
                                <button
                                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    title="Edit"
                                >
                                    <BiSolidEdit className='text-lg font-semibold' />
                                </button>
                                <button
                                    className="p-2 ml-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    title="Delete"
                                >
                                    <RiDeleteBin6Line className='text-lg font-semibold'  />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex items-center justify-between p-4 bg-gray-100">
                <span className="text-sm text-gray-700">Showing 1 to 6 of 6 entries</span>
                <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-gray-200 rounded text-gray-600 hover:bg-gray-300">
                        Previous
                    </button>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded">1</button>
                    <button className="px-3 py-1 bg-gray-200 rounded text-gray-600 hover:bg-gray-300">
                        Next
                    </button>
                </div>
            </div>
        </div>
            </main>
        </div> 
  )
}

export default ClassRoomList

