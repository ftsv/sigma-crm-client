import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import AUTH_ROUTES from '../constants/index';
import SIMPLE_ROUTES from '../constants/index';
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

const NavbarComponent = () => {
  const auth = React.useContext(AuthContext);
  const { darkMode, toggleDarkMode } = React.useContext(ThemeContext);
  const navigate = useNavigate();
  const menuStyle = darkMode ? 'dark' : 'light';

  const handleLogout = () => {
    auth.logout();
    navigate(`/${SIMPLE_ROUTES.AUTH}`, {replace: true});
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
          <Nav.Link  href={ `/${AUTH_ROUTES.CASES}` } as={Link} to={ `/${AUTH_ROUTES.CASES}` } className="nav-link">
              {<span><ListTask /> Дела</span>}
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
            <NavDropdown.Item
              href={ `/${AUTH_ROUTES.CLIENTS}` }
              as={Link}
              to={ `/${AUTH_ROUTES.CLIENTS}` }
            >
              Клиенты
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown 
            title={<span><Gear /> Настройки</span>} 
            id="preferences-nav-dropdown" 
            menuVariant={menuStyle}
          >
            <NavDropdown.Item
              href={ `/${AUTH_ROUTES.USERS}` }
              as={Link}
              to={ `/${AUTH_ROUTES.USERS}` }
            >
              Пользователи
            </NavDropdown.Item>
            {/* <NavDropdown.Item href="">РОЛИ</NavDropdown.Item> */}
            <NavDropdown.Item
              href={ `/${AUTH_ROUTES.CATEGORY}` }
              as={Link}
              to={ `/${AUTH_ROUTES.CATEGORY}` }
            >
              Категории
            </NavDropdown.Item>
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
          title={<span className="text-secondary"><PersonCircle size={30}/> {auth.initials}</span>}
          id="basic-nav-dropdown"
          menuVariant={menuStyle}
          menuRole=""
        >
        <NavDropdown.Item
          href={ `/${AUTH_ROUTES.PROFILE}` }
          as={Link}
          to={ `/${AUTH_ROUTES.PROFILE}` }
        >
          Профиль
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={handleLogout}>
          <BoxArrowRight /> Выйти
        </NavDropdown.Item>
      </NavDropdown>
      </Navbar.Collapse>
    </Container>
  </Navbar>

  );
}

export default NavbarComponent;
