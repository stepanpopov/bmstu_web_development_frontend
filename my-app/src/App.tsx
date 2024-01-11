import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

import {Routes, Route} from 'react-router-dom';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from './store'
import { Provider } from "react-redux";
import './index.css'

import DataServicePage from "./pages/DataServicePage/DataServicePage.tsx";
import DataServiceListPage from "./pages/DataServiceListPage/DataServiceListPage.tsx";
import { Page, SetPage, SetPageLink, SetPageTitleLink } from './models/common.ts';
import Navbar from './components/Navbar/Navbar.tsx';
import BreadCrumbs from './components/BreadCrumbs/BreadCrumbs.tsx';
import { mainPage, navTitle } from './consts.tsx';
import { Container } from 'react-bootstrap';

export const App = () => {
    const [pages, setPages] = useState<Page[]>([])

    const getSetter = (...args: Page[]) => () => setPages(args)
    const getSetterLink = (title: string, ...args: Page[]) => (link: string) => setPages([...args, {link, title}])
    const getSetterTiltleLink = (...args: Page[]): SetPageTitleLink => (link: string, title: string) => setPages([...args, {link, title}])

   /*const router = createBrowserRouter([
        {
          path: '/',
          element: <DataServiceListPage setPage={getSetter(mainPage)}/>
        },
        {
          path: '/service/:id',
          element: <DataServicePage setPage={ getSetterTiltleLink(mainPage) }/>
        }
      ])*/

    return (
            <Container fluid style={{padding: "0%"}}>
              
              <Navbar title={navTitle} link='/'/>
              <BreadCrumbs pages={pages} />
              
              <Routes>

                <Route path="/" element={
                  <DataServiceListPage setPage={getSetter(mainPage)}/>
                }/>

                <Route path="/service/:id" element={
                  <DataServicePage setPage={ getSetterTiltleLink(mainPage) }/>
                }/>

              </Routes>
              
            </Container>
    )
}
