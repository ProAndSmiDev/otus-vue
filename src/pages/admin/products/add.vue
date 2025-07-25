<script setup lang="ts">
import {onMounted, ref} from "vue"
import {Field, Form, useResetForm} from "vee-validate"
import {useProductsStore} from "@store/products"
import {Products} from "@type/Products"
import ModalProductAdd from "@components/modal/ModalProductAdd.vue"
import {useRouter} from "vue-router"

const store = useProductsStore()
const resetForm = useResetForm()
const isProductAdded = ref<boolean>(false)
const router = useRouter()
const formFields: Forms[] = [
  {
    id: 1,
    label: 'Название продукта:',
    name: 'productName',
    type: 'text',
    placeholder: 'Введите название продукта',
  },
  {
    id: 2,
    label: 'Описание продукта:',
    name: 'productDescription',
    type: 'textarea',
    placeholder: 'Введите описание продукта'
  },
  {
    id: 3,
    label: 'Цена продукта:',
    name: 'productPrice',
    type: 'text',
    placeholder: '0.00'
  },
  {
    id: 4,
    label: 'Кол-во товара:',
    name: 'productQty',
    type: 'number',
    placeholder: '0'
  },
  {
    id: 5,
    label: 'Изображение продукта:',
    name: 'productImage',
    type: 'file',
  }
]

function addProductWithData(values: Record<string, any>): void {
  const lastProductId = store.products.length > 0 ? store.products[store.products.length - 1].id : 0

  const formData: Products = {
    id: lastProductId + 1,
    title: values.productName,
    price: parseFloat(values.productPrice),
    description: values.productDescription,
    image: values.productImage,
    rating: {
      rate: 0,
      count: 0
    },
    qty: {
      inCart: 0,
      available: values.productQty
    }
  };

  store.addProduct(formData)
  resetForm()
  isProductAdded.value = true
}

function handleCloseModal(): void {
  router.go(0)
  isProductAdded.value = false
}

onMounted(async () => {
  await store.fetchProducts()
})
</script>

<template>
  <section class="admin-products-add">
    <div class="admin-products-add__wrapper">
      <h1 class="admin-products-add__title">Добавление нового продукта</h1>

      <Form
          @submit="addProductWithData"
          class="admin-products-add__form"
      >
        <label v-for="field in formFields" :key="field.id" class="admin-products-add__label">
          <span class="admin-products-add__label-caption">
            {{ field.label }}
          </span>

          <Field
              v-if="field.type === 'textarea'"
              :name="field.name"
              :rows="10"
              :placeholder="field?.placeholder"
              draggable="false"
              as="textarea"
              class="admin-products-add__field"></Field>
          <Field
              v-else
              :name="field.name"
              :type="field.type"
              :placeholder="field?.placeholder"
              class="admin-products-add__field"
          />
        </label>

        <button class="admin-products-add__submit" type="submit">
          Добавить продукт
        </button>
      </Form>

      <ModalProductAdd v-if="isProductAdded" @close-modal="handleCloseModal" />
    </div>
  </section>
</template>

<style scoped src="./styles/admin-products-add.css"></style>
