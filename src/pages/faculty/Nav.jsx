import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className="flex w-full justify-between items-center bg-gray-100 px-6 py-3 shadow fixed">
                <div className="flex gap-4">
                    <Link
                            to = "/academic/faculty-list"
                        className={`px-4 py-2 rounded-md`}
                    >
                        List
                    </Link>
                    <Link to = '/academic/add-faculty'
                        className={`px-4 py-2 rounded-md`}
                    >
                        Create
                    </Link>
                </div>
            </div>
  )
}

export default Nav
