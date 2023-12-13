import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import DataServicePage from "./pages/DataServicePage/DataServicePage.tsx";
import DataServiceListPage from "./pages/DataServiceListPage/DataServiceListPage.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DataServiceListPage/>
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
