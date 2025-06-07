import { defineStore } from "pinia"
import { ref } from "vue"
import axios from "axios"
import { IProducts } from "@types/Products"

export const useProductsStore = defineStore("products", () => {
    const products = ref<IProducts[]>([])
    const isLoading = ref<boolean>(true)

    const fetchProducts = async () => {
        try {
            const response = await axios.get("https://fakestoreapi.com/products")
            const localProducts = JSON.parse(localStorage.getItem("localProducts") || "[]")
            const combinedProducts = [...response.data, ...localProducts]

            products.value = combinedProducts.map(product => {
                return {
                    ...product,
                    qty: {
                        available: product.qty?.available || 10,
                        inCart: 0,
                    }
                }
            })
        } catch (err) {
            console.error("Ошибка при загрузке продуктов:", err)
        } finally {
            isLoading.value = false
        }
    }

    const addProduct = (newProduct: IProducts) => {
        products.value.push(newProduct)
        const localProducts = JSON.parse(localStorage.getItem("localProducts") || "[]")
        localProducts.push(newProduct)
        localStorage.setItem("localProducts", JSON.stringify(localProducts))
    }

    return {
        products,
        isLoading,
        fetchProducts,
        addProduct,
    }
})
