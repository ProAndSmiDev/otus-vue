<script setup lang="ts">
import {RouterView} from "vue-router";
import HeaderBar from "./components/header/HeaderBar.vue";
import {ref, watch} from "vue";

const productsInCartIds = ref<number[]>([1, 1, 4, 7, 2])
</script>

<template>
  <div class="app">
    <HeaderBar :countItems="productsInCartIds.length" class="app__header" />
    <RouterView />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}

button {
  background-color: transparent;
  border: unset;
  cursor: pointer;
}

img {
  width: auto;
  height: 100%;
  object-fit: cover;
}

ul, ol {
  list-style: none;
  display: flex;
}
</style>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  row-gap: 24px;
}

.app .app__header {
  width: 100%;
}
</style>
