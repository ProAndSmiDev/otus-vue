<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <main class="cart-success">
    <h1 class="cart-success__title">
      Спасибо за покупку!
    </h1>

    <p class="cart-success__description">
      В ближайшее время с Вами свяжется оператор для уточнения информации
    </p>

    <RouterLink to="/" class="cart-success__link">
      Вернуться на главную
    </RouterLink>
  </main>
</template>

<style scoped src="./styles/cart-success.css"></style>
