<script setup lang="ts">
import {RouterLink} from "vue-router";
</script>

<template>
  <section class="header-bar-admin">
    <RouterLink
        to="/admin/products/add"
        class="header-bar-admin__link"
        activeClass="header-bar-admin__link--active"
    >
      Добавить продукт
    </RouterLink>
  </section>
</template>

<style scoped src="./styles/header-bar-admin.css"></style>
