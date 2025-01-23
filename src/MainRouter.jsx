import React, {useReducer, useEffect, useState} from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { DndProvider } from "react-dnd";
import {
  HTML5Backend
  
} from "react-dnd-html5-backend";
 import api from "./api";
import "./index.css";
import App from "./App";
import AcademicSetting from "./pages/AcademicSetting";
import Program from "./pages/program/Program";
import HierarchyContext from "./contexts/HierarchyContext";
import HierarchyReducer from "./reducers/HierarchyReducer";
import ProgramAdd from "./pages/program/ProgramAdd";
import ProgramList from "./pages/program/ProgramList";
import Department from "./pages/department/Department";
import DepartmentAdd from "./pages/department/DepartmentAdd";
import DepartmentList from "./pages/department/DepartmentList";
import Faculty from "./pages/faculty/Faculty";
import FacultyAdd from "./pages/faculty/FactultyAdd";
import FacultyList from "./pages/faculty/FacultyList";
import Course from "./pages/course/Course";
import CourseAdd from "./pages/course/CourseAdd";
import CourseList from "./pages/course/CourseList";
import Batch from "./pages/batch/Batch";
import BatchAdd from "./pages/batch/BatchAdd";
import BatchList from "./pages/batch/BatchList";

export const MainRouter = () => {

    const [state, dispatch] = useReducer(HierarchyReducer,  [] );
    
    useEffect(() => {
        getHierarchy()
    },[])
    
    const getHierarchy = async () => {
        try {
            const hierarchyResponse = await api.fetchHierarchy(1);
            const hierarchyData = hierarchyResponse.data;
            dispatch({ type: 'GET',  hierarchyData})

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
  
    
    
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/academic-setting",
    element: <AcademicSetting />,
  },
  {
    path: "/academic/program",
    element: <Program />,
  },
  {
    path: "/academic/add-program",
    element: <ProgramAdd />,
  },
  {
    path: "/academic/program-list",
    element: <ProgramList />,
  },

  {
    path: "/academic/department",
    element: <Department />,
  },
  {
    path: "/academic/add-department",
    element: <DepartmentAdd />,
  },
  {
    path: "/academic/department-list",
    element: <DepartmentList />,
  },
  {
    path: "/academic/faculty",
    element: <Faculty />,
  },
  {
    path: "/academic/add-faculty",
    element: <FacultyAdd />,
  },
  {
    path: "/academic/faculty-list",
    element: <FacultyList />,
  },
  {
    path: "/academic/course",
    element: <Course />,
  },
  {
    path: "/academic/add-course",
    element: <CourseAdd />,
  },
  {
    path: "/academic/course-list",
    element: <CourseList />,
  },
  {
    path: "/academic/batch",
    element: <Batch />,
  },
  {
    path: "/academic/add-batch",
    element: <BatchAdd />,
  },
  {
    path: "/academic/batch-list",
    element: <BatchList />,
  },
]);
    
    return (
        <DndProvider backend={HTML5Backend}>
            <HierarchyContext.Provider
                value={
                    {
                       state, dispatch 
                    }
                }
            >
            <RouterProvider router={router} />
          </HierarchyContext.Provider>
        </DndProvider>
  )
}
