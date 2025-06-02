<script setup lang="ts">
import {Field, Form} from "vee-validate";

const formFields = [
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
    label: 'Изображение продукта:',
    name: 'productImage',
    type: 'file',
  }
]
</script>

<template>
  <section class="admin-products-add">
    <div class="admin-products-add__wrapper">
      <h1 class="admin-products-add__title">Добавление нового продукта</h1>

      <Form class="admin-products-add__form">
        <label v-for="field in formFields" :key="field.id" class="admin-products-add__label">
          <span class="admin-products-add__label-caption">
            {{ field.label }}
          </span>

          <textarea
              v-if="field.type === 'textarea'"
              :name="field.name"
              :rows="10"
              :placeholder="field?.placeholder"
              draggable="false"
              class="admin-products-add__field"></textarea>
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
    </div>
  </section>
</template>

<style scoped src="./styles/admin-products-add.css"></style>
