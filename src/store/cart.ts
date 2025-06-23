import {defineStore} from "pinia"
import {computed, ref} from "vue"
import {IProducts} from "@type/Products"
import getSalePrice from "@utils/getSalePrice"

export const useCartStore = defineStore("cart", () => {
    const cartProducts = ref<IProducts[]>([])
    const discountPercentage = ref<number>(25)

    const saveCartToLocalStorage = () => {
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts.value))
    }

    const loadCartFromLocalStorage = () => {
        const stored = localStorage.getItem('cartProducts')

        if (stored) {
            cartProducts.value = JSON.parse(stored);
        }
    };

    const syncProductQty = (productId: number, newInCart: number) => {
        const product = cartProducts.value.find(p => p.id === productId)

        if (product) {
            product.qty.inCart = newInCart
        }
    }

    const addToCart = (product: IProducts) => {
        const existingProduct = cartProducts.value.find(item => item.id === product.id)

        if (existingProduct) {
            // Увеличиваем qty.inCart у уже существующего товара
            existingProduct.qty.inCart += 1
            syncProductQty(product.id, existingProduct.qty.inCart)
        } else {
            // Создаём новый объект из переданного продукта, устанавливаем inCart в 1
            const newProduct = {
                ...product,
                qty: {
                    ...product.qty,
                    inCart: 1,
                }
            };
            cartProducts.value.push(newProduct)
            syncProductQty(product.id, 1)
        }

        saveCartToLocalStorage()
    }

    const getCounterByCartItems = () => {
        return cartProducts.value.reduce((total, product) => total + (product.qty.inCart || 0), 0)
    }

    const clearCart = () => {
        cartProducts.value.length = 0
        saveCartToLocalStorage()
    }

    const addToCartById = (productId: number) => {
        const productInCart = cartProducts.value.find((product) => product.id === productId)

        if(productInCart) {
            productInCart.qty.inCart++
            syncProductQty(productId, productInCart.qty.inCart)
        }

        saveCartToLocalStorage()
    }

    const removeFromCart = (productId: number) => {
        const productInCart = cartProducts.value.find((product) => product.id === productId)

        if (productInCart) {
            if (productInCart.qty.inCart > 1) {
                productInCart.qty.inCart--
                syncProductQty(productId, productInCart.qty.inCart)
            } else {
                const index = cartProducts.value.findIndex((product) => product.id === productId)

                if (index !== -1) {
                    cartProducts.value.splice(index, 1)
                }

                syncProductQty(productId, 0)
            }
        }

        saveCartToLocalStorage()
    }

    const getTotalPriceByCartItems = computed(() => {
        const totalPrice = computed(() => cartProducts.value.reduce((sum, product) => {
            return sum + (product.price * product.qty.inCart)
        }, 0))

        const saleTotalPrice = computed(() => cartProducts.value.reduce((sum, product) => {
            return sum + (getSalePrice(product.price) * product.qty.inCart)
        }, 0))

        return {
            totalPrice,
            saleTotalPrice,
        }
    })

    loadCartFromLocalStorage()

    return {
        clearCart,
        cartProducts,
        addToCart,
        getCounterByCartItems,
        removeFromCart,
        addToCartById,
        getTotalPriceByCartItems,
        discountPercentage,
    }
})
