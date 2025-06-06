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

    <div class="app__content">
      <RouterView />
    </div>

    <footer class="app__footer">
      Copyright by @ProAndSmiDev
    </footer>
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

a {
  text-decoration: none;
}
</style>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  min-height: 100vh;
}

.app .app__upper,
.app .app__footer {
  flex: 0 0 auto;
}

.app .app__content {
  flex: 1 0 auto;
  display: grid;
}

.app .app__header {
  width: 100%;
}

.app .app__footer {
  display: flex;
  justify-content: center;
  padding: 20px 40px;
  background-color: rgb(100,50,25);
  font-size: 18px;
  line-height: 25px;
  color: #fff;
}
</style>
