import {defineStore} from "pinia";
import {computed, ref, watch, unref} from "vue";
import {IProducts, IProductsItem} from "../types/Products";
import {useProductById} from "../composables/useProductById";

export const useCartStore = defineStore("cart", () => {
    const cartProducts = ref<IProducts[]>([]) // массив товаров в корзине с их количеством

    const addToCart = (product: IProducts) => {
        // Проверяем, есть ли уже товар в корзине
        const existingProductIndex = cartProducts.value.findIndex(item => item.item?.id === product.item.id);

        if (existingProductIndex !== -1) {
            // Если товар уже есть, увеличиваем его количество
            cartProducts.value[existingProductIndex].qty! += product.qty;
        } else {
            // Если товара нет в корзине, добавляем его
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
