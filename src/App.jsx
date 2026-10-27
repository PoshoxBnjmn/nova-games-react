

import { useState, useEffect } from 'react'
import { Container, Button, Alert } from 'react-bootstrap'

import Encabezado from './components/Encabezado.jsx'
import Catalogo from './components/Catalogo.jsx'
import productos from './data/productos.js'

import './App.css'

function App() {

    const [carrito, setCarrito] = useState(() => {
        return JSON.parse(localStorage.getItem('nova-games-carrito')) || []
    })

    const [mostrarCarrito, setMostrarCarrito] = useState(false)

    const [busqueda, setBusqueda] = useState('')
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')
    const [orden, setOrden] = useState('relevancia')


    useEffect(() => {
        localStorage.setItem('nova-games-carrito', JSON.stringify(carrito))
    }, [carrito])

    function agregarAlCarrito(producto) {
        if (producto.stock <= 0) return

        const productoExistente = carrito.find(p => p.id === producto.id)

        if (productoExistente) {
            if (productoExistente.cantidad >= producto.stock) return

            setCarrito(carrito.map(p =>
                p.id === producto.id
                    ? { ...p, cantidad: p.cantidad + 1 }
                    : p
            ))
        } else {
            setCarrito([...carrito, { ...producto, cantidad: 1 }])
        }
    }

    function eliminarDelCarrito(id) {
        setCarrito(carrito.filter(p => p.id !== id))
    }

    const cantidad = carrito.reduce(
        (total, producto) => total + producto.cantidad,
        0
    )

    const categorias = [...new Set(productos.map(p => p.categoria))]

    let productosFiltrados = productos.filter(producto => {
        const coincideNombre = producto.nombre
            .toLowerCase()
            .includes(busqueda.toLowerCase().trim())

        const coincideCategoria =
            categoriaSeleccionada === '' ||
            producto.categoria === categoriaSeleccionada

        return coincideNombre && coincideCategoria
    })

    if (orden === 'nombre') {
        productosFiltrados.sort((a, b) =>
            a.nombre.localeCompare(b.nombre)
        )
    } else if (orden === 'precioMenor') {
        productosFiltrados.sort((a, b) => a.precio - b.precio)
    } else if (orden === 'precioMayor') {
        productosFiltrados.sort((a, b) => b.precio - a.precio)
    }

    function limpiarFiltros() {
        setBusqueda('')
        setCategoriaSeleccionada('')
        setOrden('relevancia')
    }

    return (
        <>
            <Encabezado
                cantidad={cantidad}
                onVerCarrito={() => setMostrarCarrito(!mostrarCarrito)}
                busqueda={busqueda}
                onCambiarBusqueda={setBusqueda}
                onBuscar={() => setBusqueda(busqueda.trim())}
            />

            <Container className="py-4" id="catalogo">

                {mostrarCarrito && (
                    <Alert variant="light" className="border">
                        <div className="d-flex justify-content-between align-items-center">
                            <h4>Mi carrito</h4>

                            <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => setMostrarCarrito(false)}
                            >
                                Cerrar
                            </Button>
                        </div>

                        {carrito.length === 0 ? (
                            <p>Tu carrito está vacío.</p>
                        ) : (
                            <>
                                {carrito.map(producto => (
                                    <div
                                        key={producto.id}
                                        className="d-flex justify-content-between align-items-center border-bottom py-2 gap-2"
                                    >
                                        <span>
                                            {producto.nombre} × {producto.cantidad}
                                        </span>

                                        <Button
                                            size="sm"
                                            variant="outline-danger"
                                            onClick={() => eliminarDelCarrito(producto.id)}
                                        >
                                            Eliminar
                                        </Button>
                                    </div>
                                ))}

                                <h5 className="mt-3">
                                    Total: $
                                    {carrito.reduce(
                                        (total, producto) =>
                                            total + producto.precio * producto.cantidad,
                                        0
                                    ).toLocaleString('es-CL')}
                                </h5>
                            </>
                        )}
                    </Alert>
                )}

                <h2 className="mb-3">Catálogo de videojuegos</h2>

                <Catalogo
                    productos={productosFiltrados}
                    categorias={categorias}
                    categoriaSeleccionada={categoriaSeleccionada}
                    onCambiarCategoria={setCategoriaSeleccionada}
                    busqueda={busqueda}
                    onCambiarBusqueda={setBusqueda}
                    orden={orden}
                    onCambiarOrden={setOrden}
                    onLimpiarFiltros={limpiarFiltros}
                    onAgregarProducto={agregarAlCarrito}
                />

            </Container>
        </>
    )
}

export default App
