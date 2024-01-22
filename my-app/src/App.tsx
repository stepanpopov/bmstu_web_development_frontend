import React, { useEffect, useState } from 'react'

import { Routes, Route, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import './index.css'

import DataServicePage from "./pages/DataServicePage/DataServicePage.tsx";
import DataServiceModeratorPage from "./pages/DataServiceModeratorPage/DataServiceModeratorPage.tsx";
import DataServiceNewModeratorPage from "./pages/DataServiceNewModeratorPage/DataServiceNewModeratorPage.tsx";
import DataServiceListPage from "./pages/DataServiceListPage/DataServiceListPage.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.tsx";
import RequestsPage from "./pages/RequestsPage/RequestsPage.tsx";
import RequestPage from "./pages/RequestPage/RequestPage.tsx";
import RequestsModeratorPage from "./pages/RequestsModeratorPage/RequestsModeratorPage.tsx";

import { Page, SetPageTitleLink } from './models/common.ts';
import Navbar from './components/Navbar/Navbar.tsx';
import Footer from './components/Footer/Footer.tsx';
import BreadCrumbs from './components/BreadCrumbs/BreadCrumbs.tsx';
import { PrivateRouteModerator, PrivateRouteUser } from './components/PrivateRoute/PrivateRoute.tsx';

import { mainPage, loginPage, registerPage, requestsPage, requestsModeratorPage, navTitle, footerTitle, dsModeratorNewPage, dsModeratorTabele } from './consts.tsx';

import { useAppDispatch } from "./store";
import { useLoading, useUser } from './store/user'
import { checkAuth } from './store/user'
import DataServiceListModeratorPage from './pages/DataServiceListModeratorPage/DataServiceListModeratorPage.tsx';

// TODO:
// добавить параметры к заявке (намутить crc или мб сначала посмотреть теорию по сетям)
// поправить верстку
// тест с асинхронным

export const App = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const [pages, setPages] = useState<Page[]>([])

  const getSetter = (...args: Page[]) => () => setPages(args)
  // const getSetterLink = (title: string, ...args: Page[]) => (link: string) => setPages([...args, { link, title }])
  const getSetterTiltleLink = (...args: Page[]): SetPageTitleLink => (link: string, title: string) => setPages([...args, { link, title }])

  const user = useUser()
  const loading = useLoading()

  useEffect(() => {
    if (!user && !loading) {
      navigate(mainPage.link)
    }
  }, [user])

  useEffect(() => {
    dispatch(checkAuth())
  }, [])

  return (
    <Container fluid style={{ padding: "0%" }}>

      <Navbar title={navTitle}
        mainPageLink={mainPage.link}
        loginPageLink={loginPage.link}
        registerPageLink={registerPage.link}
        requestsPageLink={requestsPage.link}
        requestsModeratorPageLink={requestsModeratorPage.link}
        servicesModeratorPageLink={dsModeratorTabele.link}
      />
      <BreadCrumbs pages={pages} />

      <Routes>

        <Route path="/" element={
          <DataServiceListPage setPage={getSetter(mainPage)}
            requestsPageLink={requestsPage.link}
          />
        } />

        <Route path="/service/:id" element={
          <DataServicePage setPage={getSetterTiltleLink(mainPage)} />
        } />

        <Route path="/login" element={
          <LoginPage setPage={getSetter(loginPage)} mainPageLink={mainPage.link} />
        } />

        <Route path="/register" element={
          <RegisterPage setPage={getSetter(registerPage)} mainPageLink={mainPage.link} />
        } />

        <Route element={<PrivateRouteUser loginPageLink={loginPage.link} mainPageLink={mainPage.link} />}>
          <Route path="/requests/:id" element={
            <RequestPage setPage={getSetterTiltleLink(mainPage, user?.role === 'moderator' ? requestsModeratorPage : requestsPage)} />
          } />

          {user?.role === 'user' && <Route path="/requests" element={
            <RequestsPage setPage={getSetter(mainPage, requestsPage)} />
          } />}

        </Route>

        <Route element={<PrivateRouteModerator loginPageLink={loginPage.link} mainPageLink={mainPage.link} />}>
          {user?.role === 'moderator' && <Route path="/requests" element={
            <RequestsModeratorPage setPage={getSetter(mainPage, requestsModeratorPage)} />
          } />}

          <Route path="/service/:id/update" element={
            <DataServiceModeratorPage setPage={getSetterTiltleLink(mainPage)} />
          } />

          <Route path="/service/new" element={
            <DataServiceNewModeratorPage mainPageLink={mainPage.link} setPage={getSetter(mainPage, dsModeratorNewPage)} />
          } />

          <Route path="/services_moderator" element={
            <DataServiceListModeratorPage
              setPage={getSetter(mainPage, dsModeratorTabele)}
              moderatorNewDSPageLink={dsModeratorNewPage.link}
            />
          } />

        </Route>

      </Routes>

      <Footer text={footerTitle} />


    </Container >
  )
}
