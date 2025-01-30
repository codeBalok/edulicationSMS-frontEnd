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
import HierarchyContext from "./contexts/HierarchyContext";
import HierarchyReducer from "./reducers/HierarchyReducer";
import ProgramAdd from "./pages/program/ProgramAdd";
import ProgramList from "./pages/program/ProgramList";
import DepartmentAdd from "./pages/department/DepartmentAdd";
import DepartmentList from "./pages/department/DepartmentList";
import FacultyAdd from "./pages/faculty/FactultyAdd";
import FacultyList from "./pages/faculty/FacultyList";
import CourseAdd from "./pages/course/CourseAdd";
import CourseList from "./pages/course/CourseList";
import BatchAdd from "./pages/batch/BatchAdd";
import BatchList from "./pages/batch/BatchList";
import SessionAdd from "./pages/session/SessionAdd";
import SessionList from "./pages/session/SessionList";
import SemesterAdd from "./pages/semester/SemesterAdd";
import SemesterList from "./pages/semester/SemesterList";
import SectionAdd from "./pages/section/SectionAdd";
import SectionList from "./pages/section/SectionList";
import ClassRoomAdd from "./pages/classRoom/ClassRoomAdd";
import ClassRoomList from "./pages/classRoom/ClassRoomList";
import ClassYearAdd from "./pages/classYear/ClassYearAdd";
import ClassYearList from "./pages/classYear/ClassYearList";
import SubjectAdd from "./pages/subject/SubjectAdd";
import SubjectList from "./pages/subject/SubjectList";
import ModuleAdd from "./pages/module/ModuleAdd";
import ModuleList from "./pages/module/ModuleList";
import UnitAdd from "./pages/unit/UnitAdd";
import UnitList from "./pages/unit/UnitList";
import AssessmentAdd from "./pages/assessment/AssessmentAdd";
import AssessmentList from "./pages/assessment/AssessmentList";
import GradingAdd from "./pages/grading/GradingAdd";
import GradingList from "./pages/grading/GradingList";
import CurriculumAdd from "./pages/curriculum/CurriculumAdd";
import CurriculumList from "./pages/curriculum/CurriculumList";
import LearningOutcomeAdd from "./pages/learningOutcome/LearningOutcomeAdd";
import LearningOutcomeList from "./pages/learningOutcome/LearningOutcomeList";
import AcademicCalendarAdd from "./pages/academicCalendar/AcademicCalendarAdd";
import AcademicCalendarAddList from "./pages/academicCalendar/AcademicCalendarList";
import EventAdd from "./pages/event/EventAdd";
import EventList from "./pages/event/EventList";
import Setting from "./pages/Setting";
import AddCustomField from "./pages/AddCustomField";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    path: "/setting",
    element: <Setting />,
  },
  {
    path: "/custom-field/:type",
    element: <AddCustomField />,
  },
  {
    path: "/academic-setting",
    element: <AcademicSetting />,
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
    path: "/academic/add-department",
    element: <DepartmentAdd />,
  },
  {
    path: "/academic/department-list",
    element: <DepartmentList />,
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
    path: "/academic/add-course",
    element: <CourseAdd />,
  },
  {
    path: "/academic/course-list",
    element: <CourseList />,
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
    path: "/academic/add-session",
    element: <SessionAdd />,
  },
  {
    path: "/academic/session-list",
    element: <SessionList />,
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
    path: "/academic/add-section",
    element: <SectionAdd />,
  },
  {
    path: "/academic/section-list",
    element: <SectionList />,
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
    path: "/academic/add-class-year",
    element: <ClassYearAdd />,
  },
  {
    path: "/academic/class-year-list",
    element: <ClassYearList />,
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
    path: "/academic/add-module",
    element: <ModuleAdd />,
  },
  {
    path: "/academic/module-list",
    element: <ModuleList />,
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
    path: "/academic/add-assessment",
    element: <AssessmentAdd />,
  },
  {
    path: "/academic/assessment-list",
    element: <AssessmentList />,
  },
  {
    path: "/academic/add-grading",
    element: <GradingAdd />,
  },
  {
    path: "/academic/grading-list",
    element: <GradingList />,
  },
  {
    path: "/academic/add-curriculum",
    element: <CurriculumAdd />,
  },
  {
    path: "/academic/curriculum-list",
    element: <CurriculumList />,
  },
  {
    path: "/academic/add-learning-outcome",
    element: <LearningOutcomeAdd />,
  },
  {
    path: "/academic/learning-outcome-list",
    element: <LearningOutcomeList />,
  },
  {
    path: "/academic/add-academic-calendar",
    element: <AcademicCalendarAdd />,
  },
  {
    path: "/academic/academic-calendar-list",
    element: <AcademicCalendarAddList />,
  },
  {
    path: "/academic/add-event",
    element: <EventAdd />,
  },
  {
    path: "/academic/event-list",
    element: <EventList />,
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
           <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
          
          </HierarchyContext.Provider>
        </DndProvider>
  )
}
