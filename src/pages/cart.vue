<script setup lang="ts">
import ProductsFull from "../components/products/ProductsFull.vue";
import {ref} from "vue";
import ModalOrder from "../components/modal/ModalOrder.vue";
import {IProducts} from "../types/Products";
import {useCartStore} from "../store/cart";
import getSalePrice from "../utils/getSalePrice";

const isSendFormModalOpen = ref<boolean>(false);

const {cartProducts, clearCart, getCounterByCartItems, getTotalPriceByCartItems} = useCartStore()
const counterProducts = getCounterByCartItems()
const products = ref<IProducts[]>(cartProducts)
const totalPrice = getTotalPriceByCartItems
</script>

<template>
  <main class="cart">
    <div class="cart__wrapper">
      <h1 class="cart__title">
        Корзина
      </h1>

      <p class="cart__subtitle">
        В корзине {{ counterProducts }} {{ counterProducts === 1 ? 'товар' : (counterProducts > 1 && counterProducts < 5 ? 'товара' : 'товаров') }}
      </p>

      <ul class="cart__list">
        <li v-for="(product, idx) in products" :key="idx">
          <ProductsFull :product class="cart__product" is-cart />
        </li>
      </ul>

      <div v-if="products.length" class="cart__lower">
        <ul class="cart__price">
          <li class="cart__price-item">
            <b>Итого:</b> {{ totalPrice }}$
          </li>
          <li class="cart__price-item">
            <b>Скидка 25%:</b> {{ getSalePrice(totalPrice, 25) }}$
          </li>
        </ul>

        <ul class="cart__actions">
          <li class="cart__actions-item">
            <button @click="clearCart()" type="button" class="cart__action">
              Очистить
            </button>
          </li>
          <li class="cart__actions-item">
            <button @click="isSendFormModalOpen = true" type="button" class="cart__action">
              Оформить заказ
            </button>
          </li>
        </ul>
      </div>

      <ModalOrder
          v-if="isSendFormModalOpen"
          :products
          @close-modal="() => isSendFormModalOpen = false"
      />
    </div>
  </main>
</template>

<style scoped src="./styles/cart.css"></style>
