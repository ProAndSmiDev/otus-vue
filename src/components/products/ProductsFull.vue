<script setup lang="ts">
import {IProducts} from "@type/Products"
import getSalePrice from "@utils/getSalePrice"
import { useCartStore } from "@store/cart"

defineProps<{
  product: IProducts
  isCart?: boolean
}>()

const { addToCart, removeFromCart, addToCartById } = useCartStore()
</script>

<template>
  <section v-if="product" class="products-full">
    <img :src="product.image" :alt="product.title" class="products-full__img">

    <div class="products-full__info">
      <header class="products-full__header">
        <h1 class="products-full__title">
          {{ product.title }}
        </h1>
      </header>

      <p class="products-full__description">
        {{ product.description }}
      </p>

      <footer class="products-full__footer">
        <ul class="products-full__rating">
          <li class="products-full__rating-item">
            <strong>Кол-во оценок:</strong> {{ product.rating.count }}
          </li>
          <li class="products-full__rating-item">
            <b>Рейтинг продукта:</b> {{ product.rating.rate }}
          </li>
        </ul>
      </footer>
    </div>

    <div class="products-full__wrapper">
      <p class="products-full__price">
        <del class="products-full__price--normal">{{ product.price }}$</del>
        <b class="products-full__price--sale">{{ getSalePrice(product.price) }}$</b>
      </p>

      <button @click="addToCart(product)" v-if="!isCart" class="products-full__add" type="button">Добавить в корзину</button>
      <div v-else class="products-full__counter">
        <button @click="removeFromCart(product.id)" class="products-full__counter-remove">-</button>
        <p class="products-full__counter-value">{{ product.qty.inCart }}</p>
        <button @click="addToCartById(product.id)" class="products-full__counter-add">+</button>
      </div>
    </div>
  </section>
</template>

<style scoped src="./styles/products-full.css"></style>
