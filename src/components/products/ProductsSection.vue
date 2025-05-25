<script setup lang="ts">
import ProductsItem from "./ProductsItem.vue";
import {ref, onMounted} from "vue";
import axios from "axios";
import ModalOrder from "../modal/ModalOrder.vue";

const isLoading = ref<boolean>(true)
const products = ref<IProductsItem[]>([])

onMounted(async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    products.value = response.data;
  } catch(error) {
    console.error("Ошибка при загрузке продуктов:", error);
  } finally {
    isLoading.value = false;
  }
})
</script>

<template>
  <section class="products-section">
    <h2 class="products-section__title">
      Список продуктов
    </h2>

    <span v-if="isLoading" class="products-section__loader">
      Загрузка, подождите...
    </span>

    <ul v-else class="products-section__list">
      <li v-for="product in products" :key="product.id" class="products-section__item">
        <ProductsItem :product="product" class="products-section__product" />
      </li>
    </ul>
  </section>
</template>

<style scoped src="./styles/products-section.css"></style>
