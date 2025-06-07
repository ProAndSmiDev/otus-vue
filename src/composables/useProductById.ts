import {useProductsStore} from "@store/products";
import {computed, ComputedRef} from "vue";
import {IProducts} from "@types/Products";

export function useProductById(productId: number) {
    const { products, isLoading } = useProductsStore();

    const product: ComputedRef<IProducts | undefined> = computed(() => {
        if (!products) return undefined

        return products.find(p => p.id === productId)
    })

    return {
        product,
    }
}
