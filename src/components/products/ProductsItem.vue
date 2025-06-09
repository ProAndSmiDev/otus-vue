<script setup lang="ts">
import {ref} from 'vue';
import ModalOrder from "@components/modal/ModalOrder.vue";
import {IProducts} from "@types/Products";
import {RouterLink} from "vue-router";
import getSalePrice from "@utils/getSalePrice";

interface Props {
  product: IProducts
}

defineProps<Props>()

const isSendFormModalOpen = ref<boolean>(false)

function openSendFormModal(e: Event) {
  e.preventDefault()
  isSendFormModalOpen.value = true
}
</script>

<template>
  <div class="products-item">
    <RouterLink :to="`/products/${product.id}`" class="products-item__link">
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
            <del class="products-item__price--normal">{{ product.price }}$</del>
            <b class="products-item__price--sale">{{ getSalePrice(product.price) }}$</b>
          </p>
          <button
              @click="openSendFormModal"
              class="products-item__order"
          >
            Оформить заказ
          </button>
        </footer>
      </article>
    </RouterLink>

    <ModalOrder
        v-if="isSendFormModalOpen"
        :products="[product]"
        @close-modal="() => isSendFormModalOpen = false"
    />
  </div>
</template>

<style scoped src="./styles/products-item.css"></style>
