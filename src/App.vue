<script setup lang="ts">
import PeopleSection from "./components/people/PeopleSection.vue";
</script>

<template>
  <div class="app">
    <PeopleSection />
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
</style>
