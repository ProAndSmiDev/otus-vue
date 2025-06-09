<script setup lang="ts">
import { ref } from 'vue'
import {IPeople} from "@types/People"

interface Props {
  people: IPeople[]
}

defineProps<Props>()

const openedInfo = ref<null | number>(null)
const isHovered = ref<boolean>(false)

function openInfo(id: number) {
  if (openedInfo.value === id) {
    return openedInfo.value = null
  }

  return openedInfo.value = id
}
</script>

<template>
  <ul class="people-list">
    <li v-for="person in people" :key="person.id" class="people-list__item">
      <picture class="people-list__avatar"></picture>

      <button type="button" @click="openInfo(person.id)" class="people-list__name">
        <span class="people-list__name-text">{{ person.name }}</span>
        <span
            class="people-list__name-status"
            :class="{
              'people-list__name-status--online': person.status === 'online',
              'people-list__name-status--offline': person.status === 'offline'
            }"
        >
        </span>
      </button>

      <hr>

      <ul v-if="openedInfo === person.id" class="people-list__info">
        <li
            v-for="(infoVal, infoIdx) in person.info"
            :key="infoIdx"
            :style="{color: isHovered ? '#000' : 'inherit'}"
            @mouseover="isHovered = true"
            @mouseleave="isHovered = false"
        >
          <strong>{{ infoIdx }}:</strong> {{ infoVal }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<style scoped src="./styles/people-list.css"></style>
