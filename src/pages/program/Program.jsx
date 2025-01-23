import React, {useEffect, useContext} from 'react'
import Sidebar from '../../components/SideBar'
import HierarchyContext from '../../contexts/HierarchyContext'
import { Link } from 'react-router-dom'


const Program = () => {

    const { state, dispatch } = useContext(HierarchyContext)
    useEffect(() => {
       console.log("from context::::", state)
    },[])

    return (
        <div className="flex h-screen">
           <Sidebar
                selectedItems = {state}
            />
            <main className="flex-1">
                 <div className="flex justify-between items-center bg-gray-100 px-6 py-3 shadow">
                <div className="flex gap-4">
                    <Link
                            to = "/academic/program-list"
                        className={`px-4 py-2 rounded-md`}
                    >
                        List
                    </Link>
                    <Link to = '/academic/add-program'
                        className={`px-4 py-2 rounded-md`}
                    >
                        Create
                    </Link>
                </div>
            </div>
             </main>
        </div> 
  )
}

export default Program

