import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

import './Navbar.css'

interface NavbarProps {
  title: string,
  link: string,
}

const MyNavbar = ({title, link}: NavbarProps) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container style={{ width: "100%" }}>
        <Row style={{ display: "flex" , justifyContent: "space-between", width: "100%"}}>
            <Col style={{ margin: "30px"}} className='navbar_title'>
                <Link to={link} className='link'>
                    {title}
                </Link>
            </Col>
            <Col style={{ margin: "30px 10% 30px  30px" }} className="navbar_text">
                Войти | Регистрация
            </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
