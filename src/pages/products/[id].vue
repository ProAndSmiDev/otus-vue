<script setup lang="ts">
import {useRoute} from "vue-router"
import ProductsFull from "../../components/products/ProductsFull.vue"
import {useProductById} from "../../composables/useProductById"

const route = useRoute()
const {product} = useProductById(Number(route.params.productId))
</script>

<template>
  <main class="products-id">
    <ProductsFull :product class="products-id__full" />
  </main>
</template>

<style scoped src="./styles/products-id.css"></style>
