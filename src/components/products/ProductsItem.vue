<script setup lang="ts">
import {computed, ref} from 'vue';
import ModalOrder from "../modal/ModalOrder.vue";

interface Props {
  product: IProductsItem
}

const props = defineProps<Props>()

const isSendFormModalOpen = ref<boolean>(false)

const normalPrice = computed(() => Number(props.product.price).toFixed(2))
const salePrice = computed(() =>(Number(props.product.price) * 0.85).toFixed(2))

function openSendFormModal() {
  isSendFormModalOpen.value = true
}
</script>

<template>
  <div class="products-item">
    <article class="products-item__wrapper">
      <header class="products-item__header">
        <img :src="product.image" alt="Фото продукта" class="products-item__photo">
      </header>

      <main class="products-item__content">
        <h3 class="products-item__title">
          {{ product.title }}
        </h3>

        <p class="products-item__description">
          {{ product.description }}
        </p>
      </main>

      <footer class="products-item__footer">
        <p class="products-item__price">
          <span class="products-item__price--sale">{{ salePrice }}$</span>
          <del class="products-item__price--normal">{{ normalPrice }}$</del>
        </p>
        <button
            @click="openSendFormModal"
            class="products-item__cart"
        >
          Оформить заказ
        </button>
      </footer>
    </article>

    <ModalOrder
        v-if="isSendFormModalOpen"
        :product
        @close-modal="() => isSendFormModalOpen = false"
    />
  </div>
</template>

<style scoped src="./styles/products-item.css"></style>
