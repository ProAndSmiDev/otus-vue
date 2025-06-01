import {useProducts} from "./useProducts";
import {computed, ComputedRef} from "vue";
import {IProductsItem} from "../types/Products";

export function useProductById(productId: number) {
    const { products, isLoading } = useProducts();

    const product: ComputedRef<IProductsItem | undefined> = computed(() => {
        if (!products.value) return undefined

        return products.value.find(p => p.id === productId)
    })

    return {
        product,
    }
}
