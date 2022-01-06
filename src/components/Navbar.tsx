import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { 
  Gear, 
  PersonCircle, 
  ListTask, 
  GraphUpArrow, 
  Calendar3, 
  FileEarmarkText, 
  MoonFill, 
  BrightnessHighFill, 
  BoxArrowRight 
} from 'react-bootstrap-icons';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';


const NavbarComp = () => {
  const auth = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext)
  // const auth = useAuth();
  const navigate = useNavigate();
  const menuStyle = darkMode ? 'dark' : 'light';

  const handleLogout = () => {
    auth.logout();
    navigate('/auth');
  }

  return (
  <Navbar variant={menuStyle} bg={menuStyle} expand="lg" fixed="top">
    <Container>
      <Navbar.Brand href="">ООО "Шнырь"</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto my-2 my-lg-0">
          {/* <Nav.Link href="">
            {<span><Calendar3 /> ПЛАНИРОВЩИК</span>}
          </Nav.Link> */}
          <Nav.Link  href="/todos" as={Link} to="/todos" className="nav-link">
              {<span><ListTask /> Задачи</span>}
          </Nav.Link>
          {/* <NavDropdown 
            title={<span><GraphUpArrow /> Отчеты</span>} 
            id="reports-nav-dropdown" 
            menuVariant={menuStyle}
          >
            <NavDropdown.Item href="">ВОРОНКА ПРОДАЖ</NavDropdown.Item>
          </NavDropdown> */}
          <NavDropdown 
            title={<span><FileEarmarkText /> Справочники</span>} 
            id="directories-nav-dropdown" 
            menuVariant={menuStyle}
          >
            <NavDropdown.Item href="/clients" as={Link} to="/clients">Клиенты</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown 
            title={<span><Gear /> Настройки</span>} 
            id="preferences-nav-dropdown" 
            menuVariant={menuStyle}
          >
            <NavDropdown.Item href="/users" as={Link} to="/users">Пользователи</NavDropdown.Item>
            {/* <NavDropdown.Item href="">РОЛИ</NavDropdown.Item> */}
            <NavDropdown.Item href="/category" as={Link} to="/category">Категории</NavDropdown.Item>
            {/* <NavDropdown.Item href="">ШАБЛОНЫ</NavDropdown.Item> */}
          </NavDropdown>
        </Nav>
        <button 
          className="btn btn-sm"
          onClick={toggleDarkMode}
        >
          {darkMode ? <BrightnessHighFill fill="white" /> : <MoonFill />}
        </button>
        <NavDropdown
          title={<span><PersonCircle size={30}/> {auth.email}</span>}
          id="basic-nav-dropdown"
          menuVariant={menuStyle}
          menuRole=""
        >
        <NavDropdown.Item href="/profile" as={Link} to="/profile">Профиль</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={handleLogout}><BoxArrowRight /> Выйти</NavDropdown.Item>
      </NavDropdown>
      </Navbar.Collapse>
    </Container>
  </Navbar>

  );
}

export default NavbarComp;
