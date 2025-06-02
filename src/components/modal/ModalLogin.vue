<script setup lang="ts">
import {ref} from 'vue'
import {useValidation} from "../../composables/useValidation";
import {Form, Field, ErrorMessage, defineRule} from "vee-validate"
import UiModal from "../ui/modal/UiModal.vue";

const rules = useValidation()

Object.entries(rules).forEach(([name, validator]) => {
  defineRule(name, validator)
})

const formFields = [
  {
    id: 1,
    label: 'Логин:',
    name: 'userLogin',
    type: 'text',
    rules: 'validateLogin',
    placeholder: 'Введите ваш логин',
  },
  {
    id: 2,
    label: 'Пароль:',
    name: 'userPassword',
    type: 'password',
    rules: 'validatePassword',
    placeholder: 'Введите ваш пароль',
  },
]
const modalTitle = ref<string>('Вход в систему')
</script>

<template>
  <UiModal
      :title="modalTitle"
      class="modal-login"
      narrow
  >
    <Form class="modal-login__form">
      <label
          v-for="field in formFields"
          :key="field.id"
          class="modal-login__label"
      >
        <span class="modal-login__label-caption">
          {{ field.label }}
        </span>

        <Field
            :name="field.name"
            :type="field.type"
            :placeholder="field.placeholder"
            :rules="field.rules"
            class="modal-login__label-input" />

        <ErrorMessage :name="field.name" class="modal-login__error" as="span" />
      </label>

      <button class="modal-login__submit">
        Войти
      </button>
    </Form>
  </UiModal>
</template>

<style scoped src="./styles/modal-login.css"></style>
