<script setup lang="ts">
import {ref} from 'vue'
import {useForm} from "vee-validate";
import {Field, Form, ErrorMessage, defineRule} from "vee-validate";
import {useValidation} from "../../composables/useValidation";
import axios from "axios";
import {IProducts} from "../../types/Products";
import UiModal from "../ui/modal/UiModal.vue";

const props = defineProps<{
  products: IProducts[]
}>()

const rules = useValidation()

Object.entries(rules).forEach(([name, validator]) => {
  defineRule(name, validator)
})

const isSentForm = ref(false)
const {resetForm} = useForm()

const formFields = [
  {
    id: 1,
    label: 'Ваше имя:',
    name: 'userName',
    type: 'text',
    rules: 'validateName',
    placeholder: 'Имя',
  },
  {
    id: 2,
    label: 'E-mail:',
    name: 'userEmail',
    type: 'email',
    rules: 'validateEmail',
    placeholder: 'E-mail',
  },
  {
    id: 3,
    label: 'Телефон:',
    name: 'userPhone',
    type: 'phone',
    rules: 'validatePhone',
    placeholder: '+7 (123) 456-78-90',
  },
  {
    id: 4,
    label: 'Адрес доставки:',
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

const modalTitle = ref<string>(isSentForm ? 'Вы успешно оформили заказ!' : 'Оформить заказ')

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
        qty: item.qty || 1,
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

function handleCloseModal() {
  isSentForm.value = false
  resetForm()
}
</script>

<template>
  <UiModal
      :title="modalTitle"
      class="modal-order"
      @close-modal="handleCloseModal"
  >
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
          <span class="modal-order__label-caption">
            {{ field.label }}
          </span>
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

        <ErrorMessage :name="field.name" class="modal-order__error" as="span" />
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
  </UiModal>
</template>

<style scoped src="./styles/modal-order.css"></style>
