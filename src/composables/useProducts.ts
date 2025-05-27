import { ref, onMounted } from "vue";
import axios from "axios";
import { IProductsItem } from "../types/Products";

export function useProducts() {
    const products = ref<IProductsItem[]>([]);
    const isLoading = ref<boolean>(true);

    onMounted(async () => {
        try {
            const response = await axios.get("https://fakestoreapi.com/products");
            products.value = response.data;
        } catch (error) {
            console.error("Ошибка при загрузке продуктов:", error);
        } finally {
            isLoading.value = false;
        }
    });

    return {
        products,
        isLoading,
    };
}
