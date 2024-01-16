import { Button, Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../store/user'
import {useAppDispatch} from "../../store";
import { logout } from '../../store/user'

import { useDraftActive } from '../../store/encryptDecryptRequestList'

import './Navbar.css'

interface NavbarProps {
  title: string,
  mainPageLink: string,
  loginPageLink: string,
  registerPageLink: string,
  requestsPageLink: string,
}

const MyNavbar = ({title, mainPageLink, loginPageLink, registerPageLink, requestsPageLink }: NavbarProps) => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const user = useUser()

  const draftActive = useDraftActive()

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

  return (
    <Navbar expand="lg">
      <Container fluid style={{ width: "100%" }}>
        <Row style={{ display: "flex", width: "100%", margin: "1% 0% 1% 0%", justifyContent: "center" }}>
            <Col lg="3" className='navbar_title'>
                <Link to={mainPageLink} className='link'>
                    {title}
                </Link>
            </Col>
            <Col lg="5">
                  <Button variant="outline-warning" onClick={requestsHandler} disabled={!draftActive} >Шифрование кодом Хэмминга</Button> 
            </Col> 
            { user ? 
              <>
                <Col lg="1" > 
                  { user.login } 
                </Col>
                <Col lg="2">
                  <Button variant="outline-warning" onClick={logoutHandler} >Выйти</Button>
                </Col>
              </>
               :
              <>
                <Col lg="1"> 
                  <Button variant="outline-warning" onClick={loginHandler} >Войти</Button> 
                </Col>
                <Col lg="2">
                  <Button variant="outline-warning" onClick={registerHandler} >Зарегистрироваться</Button>
                </Col>
              </>
            }
        </Row>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
