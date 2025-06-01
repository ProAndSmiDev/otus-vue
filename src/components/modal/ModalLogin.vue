<script setup lang="ts">
import {Form, Field} from "vee-validate"

const formFields = [
  {
    id: 1,
    label: 'Логин:',
    name: 'userLogin',
    type: 'text',
    rules: 'required',
    placeholder: 'Введите ваш логин',
  },
  {
    id: 2,
    label: 'Пароль:',
    name: 'userPassword',
    type: 'password',
    rules: 'required',
    placeholder: 'Введите ваш пароль',
  },
]
</script>

<template>
  <section class="modal-login">
    <div class="modal-login__wrapper">
      <button
          @click="closeModal"
          class="modal-login__close-modal"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21"><path fill="currentColor" d="M12.02 10 21 18.55 19.48 20l-8.98-8.55L1.52 20 0 18.55 8.98 10 0 1.45 1.52 0l8.98 8.55L19.48 0 21 1.45z"/></svg>
      </button>

      <h3 class="modal-login__title">
        Вход в систему
      </h3>

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
        </label>

        <button class="modal-login__submit">
          Войти
        </button>
      </Form>
    </div>
  </section>
</template>

<style scoped src="./styles/modal-login.css"></style>
