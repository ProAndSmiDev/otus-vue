import {defineStore} from "pinia"
import {computed, ref} from "vue"
import {IProducts} from "../types/Products"
import getSalePrice from "../utils/getSalePrice";

export const useCartStore = defineStore("cart", () => {
    const cartProducts = ref<IProducts[]>([])
    const discountPercentage = ref<number>(25)

    const saveCartToLocalStorage = () => {
        localStorage.setItem('localProducts', JSON.stringify(cartProducts.value));
    }

    const loadCartFromLocalStorage = () => {
        const stored = localStorage.getItem('localProducts');

        if (stored) {
            cartProducts.value = JSON.parse(stored);
        }
    };

    const syncProductQty = (productId: number, newInCart: number) => {
        const product = cartProducts.value.find(p => p.id === productId);

        if (product) {
            product.qty.inCart = newInCart;
        }
    }

    const addToCart = (product: IProducts) => {
        const existingProduct = cartProducts.value.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.qty.inCart += 1;
            console.log(product.qty.inCart = existingProduct.qty.inCart);
        } else {
            product.qty.inCart = (product.qty.inCart || 0) + 1;

            cartProducts.value.push({
                ...product,
                qty: {
                    inCart: product.qty.inCart,
                    available: product.qty.available,
                }
            });
        }

        saveCartToLocalStorage()
        syncProductQty(product.id, product.qty.inCart)
    }

    const getCounterByCartItems = () => {
        return cartProducts.value.reduce((total, product) => total + (product.qty.inCart || 0), 0);
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

        if (productInCart.qty.inCart > 1) {
            productInCart.qty.inCart--
            syncProductQty(productId, productInCart.qty.inCart)
        } else {
            const index = cartProducts.value.findIndex((product) => product.id === productId);

            if (index !== -1) {
                cartProducts.value.splice(index, 1);
            }

            syncProductQty(productId, 0)
        }

        saveCartToLocalStorage()
    }

    const getTotalPriceByCartItems = computed(() => {
        const totalPrice = computed(() => cartProducts.value.reduce((sum, product) => {
            return sum + (product.price * product.qty.inCart);
        }, 0))

        const saleTotalPrice = computed(() => cartProducts.value.reduce((sum, product) => {
            return sum + (getSalePrice(product.price) * product.qty.inCart)
        }, 0))

        return {
            totalPrice,
            saleTotalPrice,
        }
    })

    loadCartFromLocalStorage();

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
