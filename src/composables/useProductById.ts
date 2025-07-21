import {useProductsStore} from "@store/products";
import {computed, ComputedRef} from "vue";
import {Products} from "@type/Products";

export function useProductById(productId: number) {
    const { products } = useProductsStore();

    const product: ComputedRef<Products | undefined> = computed(() => {
        if (!products) return undefined

        return products.find((p: Products) => p.id === productId)
    })

    return {
        product,
    }
}
