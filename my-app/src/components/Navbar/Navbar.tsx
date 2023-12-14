import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

import './Navbar.css'

interface NavbarProps {
  title: string,
  link: string,
}

const MyNavbar = ({title, link}: NavbarProps) => {
  return (
    <Navbar bg="light" expand="lg" className='navbar'>
      <Container>
        <Row style={{ display: "flex" , justifyContent: "space-between", backgroundImage: "background-image: linear-gradient(to bottom, #1a1b23, #1d1e26, #1f2028, #22232b, #25262e, #26272e, #26272e, #27282e, #26262b, #242427, #232324, #212121)"}}>
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
