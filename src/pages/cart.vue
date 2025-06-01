<script setup lang="ts">
import ProductsFull from "../components/products/ProductsFull.vue";
import {useProductById} from "../composables/useProductById";
import {ref, watch} from "vue";
import ModalOrder from "../components/modal/ModalOrder.vue";
import {useProducts} from "../composables/useProducts";
import {IProducts} from "../types/Products";

const productsInCartIds = ref<number[]>([1, 1, 4, 7, 2, 4])
const isSendFormModalOpen = ref<boolean>(false);

const cartItems = ref<IProducts[]>([])
const {isLoading} = useProducts()

watch(productsInCartIds, () => {
  try {
    const grouped: IProducts = {};

    productsInCartIds.value.forEach(id => {
      const { product } = useProductById(id);

      if (grouped[id]) {
        grouped[id].quantity += 1;
      } else {
        grouped[id] = { item: product, quantity: 1 };
      }
    });

    cartItems.value = Object.values(grouped);
  } catch (error) {
    console.error("Error grouping products in cart:", error);
  }

}, { immediate: true })

function clearCart() {
  cartItems.value.length = 0
}
</script>

<template>
  <main class="cart">
    <div class="cart__wrapper">
      <h1 class="cart__title">
        Корзина
      </h1>

      <span v-if="isLoading" class="cart__loader">
        Загрузка, подождите...
      </span>

      <template v-else>
        <ul class="cart__list">
          <li v-for="(product, idx) in cartItems" :key="idx">
            <ProductsFull :product class="cart__product" is-cart />
          </li>
        </ul>

        <ul class="cart__actions">
          <li class="cart__actions-item">
            <button @click="clearCart" type="button" class="cart__action">
              Очистить
            </button>
          </li>
          <li class="cart__actions-item">
            <button @click="isSendFormModalOpen = true" type="button" class="cart__action">
              Оформить заказ
            </button>
          </li>
        </ul>
      </template>

      <ModalOrder
          v-if="isSendFormModalOpen"
          :products="cartItems"
          @close-modal="() => isSendFormModalOpen = false"
      />
    </div>
  </main>
</template>

<style scoped src="./styles/cart.css"></style>
