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
import Session from "./pages/session/Session";
import SessionAdd from "./pages/session/SessionAdd";
import SessionList from "./pages/session/SessionList";
import Semester from "./pages/semester/Semester";
import SemesterAdd from "./pages/semester/SemesterAdd";
import SemesterList from "./pages/semester/SemesterList";
import Section from "./pages/section/Section";
import SectionAdd from "./pages/section/SectionAdd";
import SectionList from "./pages/section/SectionList";
import ClassRoom from "./pages/classRoom/ClassRoom";
import ClassRoomAdd from "./pages/classRoom/ClassRoomAdd";
import ClassRoomList from "./pages/classRoom/ClassRoomList";
import ClassYear from "./pages/classYear/ClassYear";
import ClassYearAdd from "./pages/classYear/ClassYearAdd";
import ClassYearList from "./pages/classYear/ClassYearList";
import Subject from "./pages/subject/Subject";
import SubjectAdd from "./pages/subject/SubjectAdd";
import SubjectList from "./pages/subject/SubjectList";
import Module from "./pages/module/Module";
import ModuleAdd from "./pages/module/ModuleAdd";
import ModuleList from "./pages/module/ModuleList";
import Unit from "./pages/unit/Unit";
import UnitAdd from "./pages/unit/UnitAdd";
import UnitList from "./pages/unit/UnitList";
import Assessment from "./pages/assessment/Assessment";
import AssessmentAdd from "./pages/assessment/AssessmentAdd";
import AssessmentList from "./pages/assessment/AssessmentList";
import GradingAdd from "./pages/grading/GradingAdd";
import Grading from "./pages/grading/Grading";

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
  {
    path: "/academic/session",
    element: <Session />,
  },
  {
    path: "/academic/add-session",
    element: <SessionAdd />,
  },
  {
    path: "/academic/session-list",
    element: <SessionList />,
  },
  {
    path: "/academic/semester",
    element: <Semester />,
  },
  {
    path: "/academic/add-semester",
    element: <SemesterAdd />,
  },
  {
    path: "/academic/semester-list",
    element: <SemesterList />,
  },
  {
    path: "/academic/section",
    element: <Section />,
  },
  {
    path: "/academic/add-section",
    element: <SectionAdd />,
  },
  {
    path: "/academic/section-list",
    element: <SectionList />,
  },
  {
    path: "/academic/class-room",
    element: <ClassRoom />,
  },
  {
    path: "/academic/add-class-room",
    element: <ClassRoomAdd />,
  },
  {
    path: "/academic/class-room-list",
    element: <ClassRoomList />,
  },
  {
    path: "/academic/class-year",
    element: <ClassYear />,
  },
  {
    path: "/academic/add-class-year",
    element: <ClassYearAdd />,
  },
  {
    path: "/academic/class-year-list",
    element: <ClassYearList />,
  },
  {
    path: "/academic/subject",
    element: <Subject />,
  },
  {
    path: "/academic/add-subject",
    element: <SubjectAdd />,
  },
  {
    path: "/academic/subject-list",
    element: <SubjectList />,
  },
  {
    path: "/academic/module",
    element: <Module />,
  },
  {
    path: "/academic/add-module",
    element: <ModuleAdd />,
  },
  {
    path: "/academic/module-list",
    element: <ModuleList />,
  },
  {
    path: "/academic/unit",
    element: <Unit />,
  },
  {
    path: "/academic/add-unit",
    element: <UnitAdd />,
  },
  {
    path: "/academic/unit-list",
    element: <UnitList />,
  },
  {
    path: "/academic/grading",
    element: <Grading />,
  },
  {
    path: "/academic/add-grading",
    element: <GradingAdd />,
  },
  {
    path: "/academic/assessment-list",
    element: <AssessmentList />,
  },
  {
    path: "/academic/assessment",
    element: <Assessment />,
  },
  {
    path: "/academic/add-assessment",
    element: <AssessmentAdd />,
  },
  {
    path: "/academic/assessment-list",
    element: <AssessmentList />,
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
