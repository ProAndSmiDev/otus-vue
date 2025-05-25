<script setup lang="ts">
import ProductsItem from "./ProductsItem.vue";
import {ref, onMounted, computed} from "vue";
import axios from "axios";
import {Field, Form} from "vee-validate";

const isLoading = ref<boolean>(true)
const products = ref<IProductsItem[]>([])

const searchInput = ref<string>('');
const searchQuery = ref<string>('');

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

const filteredProducts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  if (!query) return products.value;

  const numberQuery = parseFloat(query);

  return products.value.filter((product: IProductsItem) => {
    const nameMatch = product.title.toLowerCase().includes(query);
    const priceMatch = !isNaN(numberQuery) && product.price === numberQuery;

    return nameMatch || priceMatch;
  })
})

function handleSearch() {
  searchQuery.value = searchInput.value;
}
</script>

<template>
  <section class="products-section">
    <h2 class="products-section__title">
      Список продуктов
    </h2>

    <span v-if="isLoading" class="products-section__loader">
      Загрузка, подождите...
    </span>

    <template v-else>
      <Form class="products-section__search" @submit="handleSearch">
        <Field name="userSearch" class="products-section__search-field" placeholder="Введите название или цену" v-model="searchInput" />

        <button class="products-section__search-submit" type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" fill="currentColor"/></svg>
        </button>
      </Form>

      <ul class="products-section__list">
        <li v-for="product in filteredProducts" :key="product.id" class="products-section__item">
          <ProductsItem :product="product" class="products-section__product" />
        </li>
      </ul>
    </template>
  </section>
</template>

<style scoped src="./styles/products-section.css"></style>
