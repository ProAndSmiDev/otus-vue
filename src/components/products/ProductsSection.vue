<script setup lang="ts">
import ProductsItem from "./ProductsItem.vue"
import {ref, computed, onMounted} from "vue"
import {Field, Form} from "vee-validate"
import {useProductsStore} from "@store/products"
import SvgSearch from "@assets/svg/SvgSearch.vue";

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
        <SvgSearch />
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
