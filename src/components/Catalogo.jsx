
import { Row, Col, Form, Button } from 'react-bootstrap'
import TarjetaProducto from './TarjetaProducto.jsx'

function Catalogo({
    productos,
    categorias,
    plataformas,
    categoriaSeleccionada,
    onCambiarCategoria,
    plataformaSeleccionada,
    onCambiarPlataforma,
    orden,
    onCambiarOrden,
    onLimpiarFiltros,
    onAgregarProducto
}) {
    return (
        <Row className="g-4">

            {/* Barra lateral */}
            <Col xs={12} md={3}>
                <h4>Filtros</h4>

                <Form>

                    <h5>Categoría</h5>

                    {categorias.map((categoria) => (
                        <Form.Check
                            key={categoria}
                            type="radio"
                            name="categoria"
                            label={categoria}
                            checked={categoriaSeleccionada === categoria}
                            onChange={() => onCambiarCategoria(categoria)}
                        />
                    ))}

                    <Form.Check
                        type="radio"
                        name="categoria"
                        label="Todas"
                        checked={categoriaSeleccionada === ''}
                        onChange={() => onCambiarCategoria('')}
                    />

                    <h5>Plataforma</h5>

                    {plataformas.map((plataforma) => (
                        <Form.Check
                            key={plataforma}
                            type="radio"
                            name="plataforma"
                            label={plataforma}
                            checked={plataformaSeleccionada === plataforma}
                            onChange={() => onCambiarPlataforma(plataforma)}
                        />
                    ))}

                    <Form.Check
                        type="radio"
                        name="plataforma"
                        label="Todas"
                        checked={plataformaSeleccionada === ''}
                        onChange={() => onCambiarPlataforma('')}
                    />


                    <Form.Group className="mt-3">
                        <Form.Label>Ordenar por</Form.Label>
                        <Form.Select
                            value={orden}
                            onChange={(e) => onCambiarOrden(e.target.value)}
                        >
                            <option value="relevancia">Relevancia</option>
                            <option value="nombre">Nombre</option>
                            <option value="precioMenor">Precio: menor a mayor</option>
                            <option value="precioMayor">Precio: mayor a menor</option>
                        </Form.Select>
                    </Form.Group>

                    <Button
                        className="mt-3"
                        variant="outline-secondary"
                        onClick={onLimpiarFiltros}
                    >
                        Limpiar filtros
                    </Button>
                </Form>
            </Col>

            {/* Catálogo de productos */}
            <Col xs={12} md={9}>
                <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
                    {productos.length === 0 ? (
                        <Col>
                            <p>No hay productos para mostrar.</p>
                        </Col>
                    ) : (
                        productos.map((producto) => (
                            <Col key={producto.id}>
                                <TarjetaProducto
                                    producto={producto}
                                    onAgregarProducto={onAgregarProducto}
                                />
                            </Col>
                        ))
                    )}
                </Row>
            </Col>

        </Row>
    )
}

export default Catalogo
