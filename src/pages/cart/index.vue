<script setup lang="ts">
import ProductsFull from "@components/products/ProductsFull.vue"
import {ref, computed} from "vue"
import ModalOrder from "@components/modal/ModalOrder.vue"
import {Products} from "@type/Products"
import {useCartStore} from "@store/cart"

const isSendFormModalOpen = ref<boolean>(false);

const {cartProducts, clearCart, getCounterByCartItems, getTotalPriceByCartItems} = useCartStore()
const counterProducts = computed<number>(() => getCounterByCartItems())
const products = ref<Products[]>(cartProducts)
const {totalPrice, saleTotalPrice} = getTotalPriceByCartItems
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
            <b>Итого:</b> {{ totalPrice.toFixed(2) }}$
          </li>
          <li class="cart__price-item">
            <b>Скидка 25%:</b> {{ saleTotalPrice.toFixed(2) }}$
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
          to="/cart/success"
          @close-modal="() => isSendFormModalOpen = false"
      />
    </div>
  </main>
</template>

<style scoped src="./styles/cart.css"></style>
