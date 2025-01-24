import React, {useEffect, useContext} from 'react'
import Sidebar from '../../components/SideBar'
import HierarchyContext from '../../contexts/HierarchyContext'
import { Link } from 'react-router-dom'
import Nav from './Nav'


const Section = () => {

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
                 <Nav />
             </main>
        </div> 
  )
}

export default Section

