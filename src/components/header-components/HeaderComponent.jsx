import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'

const HeaderComponent = () => {
    return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
            <Navbar.Brand >Navbar</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link as={NavLink} to={'/'}>Home</Nav.Link>
            <Nav.Link as={NavLink} to={'/user'}>User</Nav.Link>
            <Nav.Link as={NavLink} to={'/user-dialog'}>User Dialog</Nav.Link>
            </Nav>
        </Container>
    </Navbar>
    )
}

export default HeaderComponent;