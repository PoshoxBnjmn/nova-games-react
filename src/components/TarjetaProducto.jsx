
import { Card, Button, Badge } from 'react-bootstrap';

function TarjetaProducto({ producto, onAgregarProducto }) {

    const { nombre, categoria, precio, stock, imagen } = producto;
    const agotado = stock === 0;

    return (
        <Card className='h-100 shadow-sm'>
            <Card.Img
                variant='top'
                src={imagen}
                alt={nombre}
            />
            <Card.Body className='d-flex flex-column'>
                {precio < 8000 && (
                    <Badge bg='success' className='mb-2'>
                        Oferta
                    </Badge>
                )}

                <Badge bg='secondary' className='align-self-start mb-2'>
                    {categoria}
                </Badge>

                <Card.Title>{nombre}</Card.Title>

                <Card.Text className='fs-5 fw-semibold'>
                    ${precio.toLocaleString("es-CL")}
                </Card.Text>

                <Card.Text className={agotado ? 'text-danger' : 'text-success'}>
                    {agotado ? "Sin stock" : `Quedan ${stock} unidades`}
                </Card.Text>

                <Button
                    className='mt-auto'
                    variant='primary'
                    onClick={() => onAgregarProducto(producto)}
                    disabled={agotado}
                >
                    Agregar al carrito
                </Button>

            </Card.Body>
        </Card>
    );
}

export default TarjetaProducto;
