<script setup lang="ts">
import {ref} from 'vue'
import {useValidation} from "../../composables/useValidation";
import {Form, Field, ErrorMessage, defineRule, useResetForm} from "vee-validate"
import UiModal from "../ui/modal/UiModal.vue";
import {useAuth} from "../../composables/useAuth";
import {useRouter} from "vue-router";

const props = defineProps<{
  isOpened: boolean
}>()
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

const router = useRouter()
const {login, isAuth} = useAuth()
const resetForm = useResetForm()
const emit = defineEmits(['close-modal'])
const isContentVisible = ref(false)
const notice = ref<string>('')

const handleCloseModal = () => {
  resetForm()
  emit('close-modal')
}

const handleSubmit = (values: any) => {
  const { userLogin, userPassword } = values

  if (!isAuth.value) {
    login(userLogin, userPassword)
    resetForm()
    notice.value = 'Вы успешно вошли в систему! ^_^'
  } else {
    console.warn('Вы уже авторизованы!')
    notice.value = 'Вы уже в системе! :)'
  }

  isContentVisible.value = true
}
</script>

<template>
  <UiModal
      :title="modalTitle"
      class="modal-login"
      narrow
      @close-modal="handleCloseModal"
  >
    <Form v-if="!isContentVisible" @submit="handleSubmit" class="modal-login__form">
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

    <p v-else class="modal-login__notice">
      {{ notice }}
    </p>
  </UiModal>
</template>

<style scoped src="./styles/modal-login.css"></style>
