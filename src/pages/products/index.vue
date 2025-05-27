<script setup lang="ts">
import ProductsSection from "../../components/products/ProductsSection.vue";
import {useProducts} from "../../composables/useProducts"

const { products, isLoading } = useProducts()
</script>

<template>
  <main class="products">
    <ProductsSection :products :isLoading />
  </main>
</template>

<style scoped></style>
