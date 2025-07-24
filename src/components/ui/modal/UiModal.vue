<script setup lang="ts">
interface Props {
  title: string
  narrow?: boolean
}

interface Emits {
  (e: 'close-modal'): void
}

defineProps<Props>()

const emits = defineEmits<Emits>()

function closeModal(e: Event) {
  e.preventDefault()
  emits('close-modal')
}
</script>

<template>
  <section class="ui-modal">
    <div :class="['ui-modal__wrapper', {
      'ui-modal__wrapper--narrow': narrow,
      'ui-modal__wrapper--wide': !narrow
    }]">
      <button @click="closeModal" class="ui-modal__close">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21"><path fill="currentColor" d="M12.02 10 21 18.55 19.48 20l-8.98-8.55L1.52 20 0 18.55 8.98 10 0 1.45 1.52 0l8.98 8.55L19.48 0 21 1.45z"/></svg>
      </button>

      <h3 class="ui-modal__title">
        {{ title }}
      </h3>

      <slot></slot>
    </div>
  </section>
</template>

<style scoped src="./styles/ui-modal.css"></style>
