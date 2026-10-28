import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import TarjetaProducto from './TarjetaProducto.jsx'

const producto = {
    id: 1,
    nombre: 'Juego de prueba',
    categoria: 'Acción',
    precio: 12000,
    stock: 0,
    imagen: '/imagenes/game/772415.png',
}

describe('TarjetaProducto', () => {
    it('deshabilita la compra cuando el producto está agotado', () => {
        const onAgregarProducto = vi.fn()
        render(
            <TarjetaProducto
                producto={producto}
                onAgregarProducto={onAgregarProducto}
            />
        )
        expect(
            screen.getByRole('button', { name: 'Agregar al carrito' })
        ).toBeDisabled()

        fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }))
        expect(onAgregarProducto).not.toHaveBeenCalled()
    })
})
