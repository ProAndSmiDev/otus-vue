<script setup lang="ts">
import { computed} from "vue";
import {RouteLocationNormalizedLoaded, useRoute} from "vue-router"
import ProductsFull from "@components/products/ProductsFull.vue"
import {useProductById} from "@composables/useProductById"

const route = useRoute() as RouteLocationNormalizedLoaded
const {product} = useProductById(Number(route.params.productId))
</script>

<template>
  <main class="products-id">
    <div class="products-id__wrapper">
      <ProductsFull :product class="products-id__full" />
    </div>
  </main>
</template>

<style scoped src="./styles/products-id.css"></style>
