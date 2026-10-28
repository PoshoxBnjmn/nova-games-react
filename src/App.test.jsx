import { beforeEach, describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import App from './App.jsx'

describe('App', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('muestra el catálogo y las opciones de plataforma', () => {
        render(<App />)

        expect(screen.getByText('Shadow Strike: Cyber War')).toBeInTheDocument()
        expect(screen.getByRole('radio', { name: 'PC' })).toBeInTheDocument()
        expect(screen.getByRole('radio', { name: 'Xbox' })).toBeInTheDocument()
    })

    it('filtra los juegos por plataforma', () => {
        render(<App />)

        fireEvent.click(screen.getByRole('radio', { name: 'PC' }))

        expect(screen.getByText('Speed Legends X')).toBeInTheDocument()
        expect(screen.queryByText('Nightmare Protocol')).not.toBeInTheDocument()
    })

    it('combina la búsqueda con el filtro de plataforma', () => {
        render(<App />)

        fireEvent.click(screen.getByRole('radio', { name: 'Xbox' }))
        fireEvent.change(screen.getByRole('searchbox', { name: 'Buscar un juego' }), {
            target: { value: 'Neon Drift' },
        })

        expect(screen.getByText('Neon Drift: Underground')).toBeInTheDocument()
        expect(screen.queryByText('Nightmare Protocol')).not.toBeInTheDocument()
    })

    it('agrega productos al carrito, los persiste y permite eliminarlos', () => {
        render(<App />)

        fireEvent.click(
            screen.getAllByRole('button', { name: 'Agregar al carrito' })[0]
        )

        expect(JSON.parse(localStorage.getItem('nova-games-carrito'))).toEqual([
            expect.objectContaining({
                id: 1,
                cantidad: 1,
            }),
        ])

        fireEvent.click(screen.getByRole('button', { name: /🛒/ }))
        expect(
            screen.getByText('Shadow Strike: Cyber War × 1')
        ).toBeInTheDocument()

        fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }))
        expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument()
        expect(JSON.parse(localStorage.getItem('nova-games-carrito'))).toEqual([])
    })
})
