<script setup lang="ts">
import PeopleList from "@components/people/PeopleList.vue"
import { ref } from "vue"
import {Status} from "@type/enums/Status"
import {Gender} from "@type/enums/Gender"
import {IPeople} from "@type/People"

const people: IPeople[] = [
  {
    id: 1,
    name: 'Alice',
    status: Status.ONLINE,
    avatar: '',
    info: {
      age: 25,
      gender: Gender.FEMALE,
      phone: '88005553535',
      email: 'alice@gmail.com',
    }
  },
  {
    id: 2,
    name: 'Bob',
    status: Status.OFFLINE,
    avatar: '',
    info: {
      age: 28,
      gender: Gender.MALE,
      phone: '88005553535',
      email: 'bob@gmail.com',
    },
  },
  {
    id: 3,
    name: 'Charlie',
    status: Status.ONLINE,
    avatar: '',
    info: {
      age: 32,
      gender: Gender.MALE,
      phone: '88005553535',
      email: 'charlie@gmail.com',
    },
  }
];

const openedPeople = ref<boolean>(false);
</script>

<template>
  <section class="people-section">
    <h1 class="people-section__title">Список людей</h1>

    <button
        type="button"
        @click="openedPeople = !openedPeople"
        class="people-section__btn"
        :class="{ 'people-section__btn--active': openedPeople }"
    >
      {{ openedPeople ?  'Скрыть' : 'Показать' }} список людей
    </button>

    <PeopleList v-if="openedPeople" :people="people" />
  </section>
</template>

<style scoped src="./styles/people-section.css"></style>
