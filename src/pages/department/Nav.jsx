import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className="flex justify-between items-center bg-gray-100 px-6 py-3 shadow">
                <div className="flex gap-4">
                    <Link
                            to = "/academic/department-list"
                        className={`px-4 py-2 rounded-md`}
                    >
                        List
                    </Link>
                    <Link to = '/academic/add-department'
                        className={`px-4 py-2 rounded-md`}
                    >
                        Create
                    </Link>
                </div>
            </div>
  )
}

export default Nav
