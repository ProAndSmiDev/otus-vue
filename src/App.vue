<script setup lang="ts">
import Home from "./pages/home.vue";
</script>

<template>
  <div class="app">
    <Home class="app__home" />
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
</style>
