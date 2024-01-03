import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from './store'
import { Provider } from "react-redux";
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
