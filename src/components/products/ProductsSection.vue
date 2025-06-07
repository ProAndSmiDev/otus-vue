<script setup lang="ts">
import ProductsItem from "./ProductsItem.vue"
import {ref, computed, onMounted} from "vue"
import {Field, Form} from "vee-validate"
import {useProductsStore} from "@store/products"

const searchInput = ref<string>('')
const searchQuery = ref<string>('')
const store = useProductsStore()
const products = computed(() => [...store.products])

onMounted(async () => {
  await store.fetchProducts()
})

const filteredProducts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) {
    return products.value
  }

  return products.value.filter((product: any) => {
    if (!product) return false

    const nameMatch = product.title.toLowerCase().includes(query)
    const priceMatch =
        !isNaN(parseFloat(query)) && product.price === parseFloat(query)

    return nameMatch || priceMatch
  })
})

function handleSearch() {
  searchQuery.value = searchInput.value
}
</script>

<template>
  <section class="products-section">
    <h2 class="products-section__title">
      Список продуктов
    </h2>

    <Form class="products-section__search" @submit="handleSearch">
      <Field name="userSearch" class="products-section__search-field" placeholder="Введите название или цену" v-model="searchInput" />

      <button class="products-section__search-submit" type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" fill="currentColor"/></svg>
      </button>
    </Form>

    <span v-if="store.isLoading" class="products-section__loader">
      Загрузка, подождите...
    </span>

    <ul v-else class="products-section__list">
      <li v-for="product in filteredProducts" :key="product.id" class="products-section__item">
        <ProductsItem :product class="products-section__product" />
      </li>
    </ul>
  </section>
</template>

<style scoped src="./styles/products-section.css"></style>
