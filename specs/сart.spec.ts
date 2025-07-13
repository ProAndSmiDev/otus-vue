import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from '@store/cart'
import {IProducts} from "@type/Products";

describe('Тест функции «addToCart»', () => {
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

    it('Добавляет новый товар в корзину', () => {
        const store = useCartStore()
        store.clearCart()

        const product = {
            id: 101,
            name: 'Тестовый продукт',
            price: 100,
            qty: {
                inCart: 0,
            }
        }

        store.addToCart(product)

        expect(store.cartProducts.length).toBe(1)
        expect(store.cartProducts[0].id).toBe(101)
        expect(store.cartProducts[0].qty.inCart).toBe(1)
    })

    it('Увеличивает кол-во существующего товара в корзине', () => {
        const store = useCartStore()
        const product = {
            id: 102,
            name: 'Existing Product',
            price: 200,
            qty: {
                inCart: 2,
            }
        }

        store.clearCart()
        // добавляем товар в ручную
        store.cartProducts.push(product)
        store.addToCart(product)

        expect(store.cartProducts.length).toBe(1)
        expect(store.cartProducts[0].qty.inCart).toBe(3)
    })
})

describe('Тест функции «addToCartById»', () => {
    it('Увеличивает кол-во товара в корзине', () => {
        const store = useCartStore()
        store.cartProducts = [{ id: 1, qty: { inCart: 2 } }]

        store.addToCartById(1)

        expect(store.cartProducts[0].qty.inCart).toBe(3)
    })

    it('Ничего не делает, если товара нет в корзине', () => {
        const store = useCartStore()
        store.cartProducts = [{ id: 2, qty: { inCart: 2 } }]

        store.addToCartById(1)

        expect(store.cartProducts).toEqual([{ id: 2, qty: { inCart: 2 } }])
    })
})
