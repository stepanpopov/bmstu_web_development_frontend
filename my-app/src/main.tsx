import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import DataServicePage from "./components/DataServicePage/DataServicePage.tsx";
import DataServiceList from "./components/DataServiceList/DataServiceList.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DataServiceList/>
  },
  {
    path: '/service/:id',
    element: <DataServicePage/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
