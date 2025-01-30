import React from 'react'
import { createRoot } from 'react-dom/client';
import { MainRouter } from "./MainRouter";


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
       <MainRouter />
);