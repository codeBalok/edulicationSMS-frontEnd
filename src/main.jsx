import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import AcademicSetting from "./pages/AcademicSetting";
import { DndProvider } from "react-dnd";
import {
  HTML5Backend
  
 } from "react-dnd-html5-backend";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/academic-setting",
    element: <AcademicSetting />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <RouterProvider router={router} />
    </DndProvider>
  </React.StrictMode>
);
