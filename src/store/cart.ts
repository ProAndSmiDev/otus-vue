import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {IProducts} from "../types/Products";

export const useCartStore = defineStore("cart", () => {
    const cartProducts = ref<IProducts[]>([])

    const addToCart = (product: IProducts) => {
        const existingProductIndex = cartProducts.value.findIndex(item => item.item?.id === product.item.id);

        if (existingProductIndex !== -1) {
            cartProducts.value[existingProductIndex].qty! += product.qty;
        } else {
            cartProducts.value.push({
                item: product.item,
                qty: product.qty,
            });
        }
    }

    const getCounterByCartItems = () => {
        return cartProducts.value.reduce((total, product) => total + (product.qty || 0), 0);
    }

    const clearCart = () => {
        cartProducts.value.length = 0
    }

    const addToCartById = (productId: number) => {
        const product = cartProducts.value.find((product) => product.item.id === productId)

        product.qty++
    }

    const removeFromCart = (productId: number) => {
        const product = cartProducts.value.find((product) => product.item.id === productId)

        if (product.qty > 1) {
            product.qty--
        } else {
            const index = cartProducts.value.findIndex((product) => product.item.id === productId);
            if (index !== -1) {
                cartProducts.value.splice(index, 1);
            }
        }
    }

    const getTotalPriceByCartItems = computed(() => {
        return cartProducts.value.reduce((total, product) => {
            return total + (product.item?.price || 0) * (product.qty || 0);
        }, 0)
    })

    return {
        clearCart,
        cartProducts,
        addToCart,
        getCounterByCartItems,
        removeFromCart,
        addToCartById,
        getTotalPriceByCartItems,
    }
})
