<script setup lang="ts">
import HeaderMenu from "@components/header/HeaderMenu.vue"
import {RouterLink} from "vue-router"
import {useCartStore} from "@store/cart"
import {computed, ref} from "vue"
import ModalLogin from "@components/modal/ModalLogin.vue"
import {useAuth} from "@composables/useAuth"
import SvgLogin from "@assets/svg/SvgLogin.vue"
import SvgLogout from "@assets/svg/SvgLogin.vue"
import SvgCart from "@assets/svg/SvgCart.vue"

const {getCounterByCartItems} = useCartStore()
const {isAuth, logout} = useAuth()
const cartCounter = computed(() => {
  return getCounterByCartItems()
})
const isOpened = ref<boolean>(false)
</script>

<template>
  <header class="header-bar">
    <HeaderMenu class="header-bar__menu" />

    <div class="header-bar__actions">
      <button v-if="!isAuth" @click="isOpened = true" type="button" class="header-bar__login">
        <SvgLogin />
      </button>
      <button v-else @click="logout" type="button" class="header-bar__logout">
        <SvgLogout />
      </button>
      <RouterLink to="/cart" class="header-bar__cart" activeClass="header-bar__cart--active">
        <span class="header-bar__cart-counter">{{ cartCounter }}</span>

        <SvgCart />
      </RouterLink>
    </div>

    <ModalLogin v-if="isOpened" :isOpened @close-modal="isOpened = false" />
  </header>
</template>

<style scoped src="./styles/header-bar.css"></style>
