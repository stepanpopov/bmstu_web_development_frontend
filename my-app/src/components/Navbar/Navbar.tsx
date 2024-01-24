import { Button, Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useUser, useLoading } from '../../store/user'
import { useAppDispatch } from "../../store";
import { logout } from '../../store/user'


import './Navbar.css'
import { useEffect } from 'react';
import { Loader } from '../Loader/Loader';

interface NavbarProps {
  title: string,
  mainPageLink: string,
  loginPageLink: string,
  registerPageLink: string,
  requestsPageLink: string,
  requestsModeratorPageLink: string,
  servicesModeratorPageLink: string,
}

const MyNavbar = ({ title, mainPageLink, servicesModeratorPageLink, loginPageLink, registerPageLink, requestsPageLink, requestsModeratorPageLink }: NavbarProps) => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const user = useUser()

  useEffect(() => {
    // dispatch(filterReqs({}))

  }, [])


  const logoutHandler = () => {
    dispatch(logout())
  }

  const loginHandler = () => {
    navigate(loginPageLink)
  }

  const registerHandler = () => {
    navigate(registerPageLink)
  }

  const requestsHandler = () => {
    navigate(requestsPageLink)
  }

  const requestsModeratorHandler = () => {
    navigate(requestsModeratorPageLink)
  }

  const servicesModeratorHandler = () => navigate(servicesModeratorPageLink)

  const loading = useLoading()
  if (loading) {
    return <Loader />
  }

  return (
    <Navbar bg="light" expand="lg" className="fixed-top">
      <Container fluid style={{ width: "100%" }}>
        <Row style={{ display: "flex", width: "100%", margin: "1% 0% 1% 0%", justifyContent: "start" }} className="align-items-end">
          <Col lg={user ? 4 : 8} className='navbar_title'>
            <Link to={mainPageLink} className='link'>
              {title}
            </Link>
          </Col>
          {user?.role === 'user' && <Col lg="5">
            <Link to={requestsPageLink} className='link'>
              Управление шифрованием
            </Link>
          </Col>}
          {user?.role === 'moderator' &&
              <Col lg="2">
                <Link to={requestsModeratorPageLink} className='link'>
              Управление шифрованием
            </Link>
              </Col>}
          {user?.role === 'moderator' &&
              <Col lg="3">
                <Link to={servicesModeratorPageLink} className='link'>
                    Управление данными
                </Link>
              </Col>}
  
          {user &&
             <Col lg="1" className="ml-auto">
             {user.login}
           </Col> }

          {user &&
             <Col lg="2" className="ml-auto">
              <Button variant="outline-dark" onClick={logoutHandler} >Выйти</Button>
           </Col>
          }

          { !user &&
              <Col lg="1" className="align-self-end">
                <Button variant="outline-dark" onClick={loginHandler} >Войти</Button>
              </Col> }

          { !user &&
              <Col className="align-self-end">
                <Button variant="outline-dark" onClick={registerHandler} >Зарегистрироваться</Button>
              </Col> }
        </Row>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
