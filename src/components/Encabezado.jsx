
import {   Navbar,  Nav,  Container, Button,   Badge, Form, FormControl
} from 'react-bootstrap'

import logo from '/imagenes/logo/Nova-Games-logo.png'

function Encabezado({
    cantidad,
    onVerCarrito,
    busqueda,
    onCambiarBusqueda,
    onBuscar
}) {

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" expand="lg" sticky="top">
                <Container>
                    <Navbar.Brand href="#inicio">
                        <img
                            src={logo}
                            alt="Nova Games"
                            width="65"
                            height="45"
                            className="me-2"
                        />
                        Nova entertainment
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="menu-principal" />

                    <Navbar.Collapse id="menu-principal">
                        <Nav className="me-auto">
                            <Nav.Link href="#inicio">Inicio</Nav.Link>
                            <Nav.Link href="#catalogo">Productos</Nav.Link>
                            <Nav.Link href="#comunidad">Comunidad</Nav.Link>
                            <Nav.Link href="#soporte">Soporte</Nav.Link>
                            <Nav.Link href="#contacto">Contacto</Nav.Link>
                        </Nav>

                        <Nav className="me-3">
                            <Nav.Link href="#registro">Registrarse</Nav.Link>
                            <Nav.Link href="#login">Iniciar sesión</Nav.Link>
                        </Nav>

                        <Button
                            variant="outline-light"
                            onClick={onVerCarrito}
                        >
                            🛒 <Badge bg="light" text="dark">{cantidad}</Badge>
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="py-3">
                <Form
                    className="d-flex gap-2"
                    onSubmit={(e) => {
                        e.preventDefault()
                        onBuscar()
                    }}
                >
                    <FormControl
                        type="search"
                        placeholder="Buscar un juego..."
                        aria-label="Buscar un juego"
                        value={busqueda}
                        onChange={(e) => onCambiarBusqueda(e.target.value)}
                    />

                    <Button type="submit" variant="primary">
                        Buscar
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default Encabezado
