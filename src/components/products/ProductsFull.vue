<script setup lang="ts">
import {IProductsItem} from "../../types/Products";
import getSalePrice from "../../utils/getSalePrice";

defineProps<{
  product: IProductsItem
}>()
</script>

<template>
  <section class="products-full">
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
        <b class="products-full__price--sale">{{ getSalePrice(product.price, 25) }}$</b>
      </p>
      <button class="products-full__add" type="button">Добавить в корзину</button>
    </div>
  </section>
</template>

<style scoped src="./styles/products-full.css"></style>
