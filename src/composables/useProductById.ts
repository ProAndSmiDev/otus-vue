import {useProducts} from "./useProducts";
import {computed} from "vue";

export function useProductById(productId: number) {
    const { products } = useProducts();

    const product = computed(() => {
        if (!products.value) return null

        return products.value.find(p => p.id === productId)
    })

    return {
        product,
    }
}
