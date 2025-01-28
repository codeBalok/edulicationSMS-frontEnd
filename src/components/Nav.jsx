import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = ({link}) => {
  return (
    <div className="flex w-full justify-between items-center bg-white border-b-2 border-gray-50 px-6 py-3 fixed">
                <div className="flex gap-4">
                    <NavLink
                        to={`/academic/${link}-list`}
                        className={({ isActive }) =>
                            isActive ? 'bg-sky-500/10 px-4 py-2 rounded-md' : 'px-4 py-2 rounded-md'
                        }
                        // className={`px-4 py-2 rounded-md`}
                    >
                        List
                    </NavLink>
                    <NavLink to={`/academic/add-${link}`}
                  // className={`px-4 py-2 rounded-md`}
                        className={({ isActive }) =>
                            isActive ? 'bg-sky-500/10 px-4 py-2 rounded-md' : 'px-4 py-2 rounded-md'
                        }
                    >
                        Create
                    </NavLink>
                </div>
            </div>
  )
}

export default Nav
