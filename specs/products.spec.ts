import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProductsStore } from '@store/products'
import axios from 'axios'

vi.mock('axios')

const mockData = [
    {
        id: 1,
        name: 'Product 1',
        qty: {
            available: 5
        }
    },
    {
        id: 2,
        name: 'Product 2'
    }
]

describe('Тест функции «fetchProducts»', () => {
    beforeEach(() => {
        const storage = new Map<string, string>()

        Object.defineProperty(global, 'localStorage', {
            value: {
                getItem: (key: string) => storage.get(key) || null,
                setItem: (key: string, value: string) => storage.set(key, value),
                removeItem: (key: string) => storage.delete(key),
                clear: () => storage.clear(),
            },
            configurable: true,
        })

        setActivePinia(createPinia())
    })

    it('Загружает успешно продукты', async () => {
        const store = useProductsStore()
        ;(axios.get as vi.Mock).mockResolvedValue({ data: mockData })

        await store.fetchProducts()

        expect(store.products.length).toBe(2)
        expect(store.products[0]).toMatchObject({
            id: 1,
            name: 'Product 1',
            qty: {
                available: 5,
                inCart: 0,
            }
        })
        expect(store.isLoading).not.toBeTruthy()
    })
})
