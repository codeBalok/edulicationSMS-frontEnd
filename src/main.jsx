// import React, {useContext} from "react";
// import * as ReactDOM from "react-dom/client";
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
// import { DndProvider } from "react-dnd";
// import {
//   HTML5Backend
  
//  } from "react-dnd-html5-backend";
// import "./index.css";
// import App from "./App";
// import AcademicSetting from "./pages/AcademicSetting";
// import Program from "./pages/Program";
// import HierarchyContext from "./contexts/HierarchyContext";
// import HierarchyReducer from "./reducers/HierarchyReducer";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/academic-setting",
//     element: <AcademicSetting />,
//   },
//   {
//     path: "/academic/program",
//     element: <Program />,
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <DndProvider backend={HTML5Backend}>
//       <RouterProvider router={router} />
//     </DndProvider>
//   </React.StrictMode>
// );



import React from 'react'
import { createRoot } from 'react-dom/client';
import { MainRouter } from "./MainRouter";


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
       <MainRouter />
);