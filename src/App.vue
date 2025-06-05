<script setup lang="ts">
import {RouterView} from "vue-router";
import HeaderBar from "./components/header/HeaderBar.vue";
import HeaderBarAdmin from "./components/header/HeaderBarAdmin.vue";
import {useAuth} from "./composables/useAuth";

const { isAuth } = useAuth()
</script>

<template>
  <div class="app">
    <div class="app__upper">
      <HeaderBar class="app__header" />
      <HeaderBarAdmin v-if="isAuth" class="app__bar" />
    </div>

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
