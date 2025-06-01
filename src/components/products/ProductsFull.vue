<script setup lang="ts">
import {IProducts} from "../../types/Products";
import getSalePrice from "../../utils/getSalePrice";
import { ref } from "vue"

const props = defineProps<{
  product: IProducts
  isCart?: boolean
}>()

const count = ref<number>(props.product.quantity);

function removeCounter() {
  if (count.value === 0) return
  count.value -= 1
}
function addCounter() {
  count.value += 1
}
</script>

<template>
  <section class="products-full">
    <img :src="product.item?.image" :alt="product.item?.title" class="products-full__img">

    <div class="products-full__info">
      <header class="products-full__header">
        <h1 class="products-full__title">
          {{ product.item?.title }}
        </h1>
      </header>

      <p class="products-full__description">
        {{ product.item?.description }}
      </p>

      <footer class="products-full__footer">
        <ul class="products-full__rating">
          <li class="products-full__rating-item">
            <strong>Кол-во оценок:</strong> {{ product.item?.rating.count }}
          </li>
          <li class="products-full__rating-item">
            <b>Рейтинг продукта:</b> {{ product.item?.rating.rate }}
          </li>
        </ul>
      </footer>
    </div>

    <div class="products-full__wrapper">
      <p class="products-full__price">
        <del class="products-full__price--normal">{{ product.item?.price }}$</del>
        <b class="products-full__price--sale">{{ getSalePrice(product.item?.price, 25) }}$</b>
      </p>
      <button v-if="!isCart" class="products-full__add" type="button">Добавить в корзину</button>
      <div v-else class="products-full__counter">
        <button @click="removeCounter" class="products-full__counter-remove">-</button>
        <p class="products-full__counter-value">{{ count }}</p>
        <button @click="addCounter" class="products-full__counter-add">+</button>
      </div>
    </div>
  </section>
</template>

<style scoped src="./styles/products-full.css"></style>
