import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'

import {Routes, Route, useNavigate} from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from './store'
import { Provider } from "react-redux";
import './index.css'

import DataServicePage from "./pages/DataServicePage/DataServicePage.tsx";
import DataServiceListPage from "./pages/DataServiceListPage/DataServiceListPage.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.tsx";
import RequestsPage from "./pages/RequestsPage/RequestsPage.tsx";

import { Page, SetPage, SetPageLink, SetPageTitleLink } from './models/common.ts';
import Navbar from './components/Navbar/Navbar.tsx';
import Footer from './components/Footer/Footer.tsx';
import BreadCrumbs from './components/BreadCrumbs/BreadCrumbs.tsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.tsx';

import { mainPage, loginPage, registerPage, requestsPage, navTitle, footerTitle } from './consts.tsx';

import {useAppDispatch} from "./store";
import { useUser } from './store/user'
import { checkAuth } from './store/user'

export const App = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const [pages, setPages] = useState<Page[]>([])

    const getSetter = (...args: Page[]) => () => setPages(args)
    const getSetterLink = (title: string, ...args: Page[]) => (link: string) => setPages([...args, {link, title}])
    const getSetterTiltleLink = (...args: Page[]): SetPageTitleLink => (link: string, title: string) => setPages([...args, {link, title}])

    const user = useUser()

    useEffect(() => {
      if (!user) {
        navigate(mainPage.link)
      }
    }, [user])

    useEffect(() => {
      dispatch(checkAuth())
    }, [])

    return (
            <Container fluid style={{padding: "0%"}}>
              
              <Navbar title={navTitle} 
                      mainPageLink={mainPage.link} 
                      loginPageLink={loginPage.link} 
                      registerPageLink={registerPage.link}
                      requestsPageLink={requestsPage.link}
              />
              <BreadCrumbs pages={pages} />
              
              <Routes>

                <Route path="/" element={
                  <DataServiceListPage setPage={getSetter(mainPage)}/>
                }/>

                <Route path="/service/:id" element={
                  <DataServicePage setPage={ getSetterTiltleLink(mainPage) }/>
                }/>

                <Route path="/login" element={
                  <LoginPage setPage={ getSetter(loginPage) } mainPageLink={mainPage.link}/>
                }/>

                <Route path="/register" element={
                  <RegisterPage setPage={ getSetter(registerPage) } mainPageLink={mainPage.link} />
                }/>

                <Route element={<PrivateRoute isAuth={!!user} loginPageLink={loginPage.link} />}>
                  <Route path="/requests" element={
                    <RequestsPage setPage={getSetter(mainPage, requestsPage)} />
                  } />
                </Route>

              </Routes>

              <Footer text={footerTitle} />

              
            </Container>
    )
}
