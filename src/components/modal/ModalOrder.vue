<script setup lang="ts">
import {ref} from 'vue'
import {Field, Form, ErrorMessage, useForm, defineRule} from "vee-validate";
import {useValidation} from "../../composables/useValidation";
import axios from "axios";
import {IProducts} from "../../types/Products";

const props = defineProps<{
  products: IProducts[]
}>()

const rules = useValidation()

Object.entries(rules).forEach(([name, validator]) => {
  defineRule(name, validator)
})

const isSentForm = ref(false)
const {resetForm, handleSubmit} = useForm()
const emits = defineEmits(['close-modal'])

const formFields = [
  {
    id: 1,
    label: '*Ваше имя:',
    name: 'userName',
    type: 'text',
    rules: 'validateName',
    placeholder: 'Имя',
  },
  {
    id: 2,
    label: '*E-mail:',
    name: 'userEmail',
    type: 'email',
    rules: 'validateEmail',
    placeholder: 'E-mail',
  },
  {
    id: 3,
    label: '*Телефон:',
    name: 'userPhone',
    type: 'phone',
    rules: 'validatePhone',
    placeholder: '+7 (123) 456-78-90',
  },
  {
    id: 4,
    label: '*Адрес доставки:',
    name: 'userAddress',
    type: 'text',
    rules: 'validateAddress',
    placeholder: 'г. Москва, ул. Академика Королёва, д.32, к. 2, под.1, эт.1, кв.4',
  },
  {
    id: 5,
    label: 'Я согласен на обработку персональных данных',
    name: 'userAgreement',
    type: 'checkbox',
    value: true,
    rules: 'validateAgreement',
  }
]

async function sendForm(values: FormOrderValues | any) {
  try {
    const data = ref<Object>([])

    props.products.forEach((item) => {
      data.value.push({
        name: values.userName,
        email: values.userEmail,
        phone: values.userPhone,
        address: values.userAddress,
        agreement: values.userAgreement,
        productName: item.product.title,
        productPrice: item.product.price,
        quantity: item.quantity || 1,
      })
    })

    const response = await axios.post('https://httpbin.org/post', data)
    console.log('Ответ сервера', response.data)
  } catch (error) {
    console.log('Ошибка при отправке:', error)
  }

  resetForm()
  isSentForm.value = true

  // TODO: интервал для просмотра модалки и ответа сервера до его перенаправления
  setTimeout(() => {
    window.location.href = '/'
  }, 15000)
}
function closeModal(e: Event) {
  e.preventDefault()
  resetForm()
  isSentForm.value = false
  emits('close-modal')
}
</script>

<template>
  <section class="modal-order">
    <div class="modal-order__wrapper">
      <button
          @click="closeModal"
          class="modal-order__close-modal"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21"><path fill="currentColor" d="M12.02 10 21 18.55 19.48 20l-8.98-8.55L1.52 20 0 18.55 8.98 10 0 1.45 1.52 0l8.98 8.55L19.48 0 21 1.45z"/></svg>
      </button>

      <h3 class="modal-order__title">
        {{ isSentForm ? 'Вы успешно оформили заказ!' : 'Оформить заказ' }}
      </h3>

      <Form
          v-if="!isSentForm"
          class="modal-order__form"
          @submit="sendForm"
      >
        <label
            v-for="field in formFields"
            :key="field.id"
            class="modal-order__label"
            :class="{
              'modal-order__label--user-agreement': field.name === 'userAgreement'
            }"
        >
          <template v-if="field.type !== 'checkbox'">
            <p class="modal-order__label-caption">
              {{ field.label }}
            </p>
          </template>

          <Field
              :name="field.name"
              :type="field.type"
              class="modal-order__field"
              :placeholder="field?.placeholder"
              :rules="field.rules"
              :value="field.value"
          />

          <template v-if="field.type === 'checkbox'">
            {{ field.label }}
          </template>

          <ErrorMessage :name="field.name" class="modal-order__error" as="p" />
        </label>

        <button type="submit" class="modal-order__submit">Отправить</button>
      </Form>

      <template v-else>
        <p class="modal-order__notice">
          В ближайшее время с Вами свяжется наш менеджер для уточнения деталей.
        </p>
        <p class="modal-order__notice">
          Через 15 секунд Вы будете перенаправлены на главную страницу.
        </p>
      </template>
    </div>
  </section>
</template>

<style scoped src="./styles/modal-order.css"></style>
