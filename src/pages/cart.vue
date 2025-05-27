<script setup lang="ts">
import ProductsFull from "../components/products/ProductsFull.vue";
import {useProductById} from "../composables/useProductById";
import {IProductsItem} from "../types/Products";
import {ref, watch} from "vue";

const productsInCartIds = ref<number[]>([1, 1, 4, 7])

const cartItems = ref<{product: IProductsItem, quantity: number}[]>([])

watch(productsInCartIds, () => {
  // Временный объект для сгруппированных товаров
  const grouped: Record<number, { product: IProductsItem; quantity: number }> = {};

  productsInCartIds.value.forEach(id => {
    // Получаем товар
    const { product } = useProductById(id);

    // Проверка, есть ли уже такой товар в сгруппированном объекте
    if (grouped[id]) {
      grouped[id].quantity += 1;
    } else {
      grouped[id] = { product, quantity: 1 };
    }
  });

  // Обновляем массив
  cartItems.value = Object.values(grouped);
}, { immediate: true })
</script>

<template>
  <main class="cart">
    <div class="cart__wrapper">
      <h1 class="cart__title">
        Корзина
      </h1>

      <ul class="cart__list">
        <li v-for="(item, idx) in cartItems" :key="idx">
          <ProductsFull :product="item.product" class="cart__product" :counter="item.quantity" is-cart />
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped src="./styles/cart.css"></style>
