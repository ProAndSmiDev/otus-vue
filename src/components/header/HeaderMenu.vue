<script setup lang="ts">
import { RouterLink } from "vue-router";

const menu: Menu[] = [
  {
    id: 1,
    name: 'Главная',
    url: '/',
    title: 'Перейти на главную',
  },
  {
    id: 2,
    name: 'Продукты',
    url: '/products',
    title: 'Перейти в каталог продуктов',
  },
];
</script>

<template>
  <ul class="header-menu">
    <li v-for="menuItem in menu" :key="menuItem.id" class="header-menu__item">
      <RouterLink
          :to="menuItem.url"
          :title="menuItem.title"
          class="header-menu__link"
          active-class="header-menu__link--active"
      >
        {{ menuItem.name }}
      </RouterLink>
    </li>
  </ul>
</template>

<style scoped src="./styles/header-menu.css"></style>
