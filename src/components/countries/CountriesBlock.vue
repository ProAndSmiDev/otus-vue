<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount} from "vue";

interface Props {
  countries: Country[];
}

const props = defineProps<Props>()

const userCityName = ref('')
const userCityCode = ref('')

const countriesData = ref<Country[]>([])
countriesData.value = [...props.countries]

let socket: WebSocket | null = null

const addCity = () => {
  console.log('Добавление города:', userCityName.value, userCityCode.value);

  if (!userCityName.value || !userCityCode.value) {
    alert('Пожалуйста, заполните все поля')
    return
  }

  if (socket !== null && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({
      type: 'addCity',
      code: userCityCode.value,
      name: userCityName.value,
      emoji: 'undefined',
    }))

    userCityName.value = ''
    userCityCode.value = ''
  } else {
    alert('Нет соединения с сервером')
  }
}

onMounted(() => {
  socket = new WebSocket('ws://localhost:8080/countries')

  socket.onopen = () => {
    console.log('Соединение установлено');

    socket?.send(JSON.stringify({
      type: 'initCountries',
      countries: props.countries,
    }));

    // Запросите список стран (если нужно)
    socket?.send(JSON.stringify({ type: 'getCountries' }));
  }

  socket.onmessage = (e) => {
    console.log(e.data)
    const data = JSON.parse(e.data)
    if(data.countries) {
      countriesData.value = data.countries
    }
  }

  socket.onclose = () => {
    console.log('Соединение с сервером закрыто')
    socket = null
  }

  socket.onerror = (error) => {
    console.error('Ошибка WebSocket:', error)
  }
})

onBeforeUnmount(() => {
  if (socket) {
    socket.close()
  }
})

</script>

<template>
  <section class="countries-block">
    <h2 class="countries-block__title">
      Города мира
    </h2>

    <form @submit.prevent="addCity" action="#" class="countries-block__form">
      <input type="text" class="countries-block__input" placeholder="Введите название города" v-model="userCityName" />
      <input type="text" class="countries-block__input" placeholder="Введите код города" v-model="userCityCode" />

      <button type="submit" class="countries-block__add">
        Добавить город
      </button>
    </form>

    <ul class="countries-block__list">
      <li v-for="(country, countryId) in countriesData" :key="countryId">
        {{ country.name }} / {{ country.emoji }} / {{ country.code }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
.countries-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.countries-block__title {
  font-size: 48px;
  line-height: 58px;
  color: rgb(100,50,25);
  font-weight: 700;
  text-align: center;
}

.countries-block__list {
  width: 100%;
  flex-direction: column;
  gap: 10px;
  max-height: 1600px;
  flex-wrap: wrap;
  margin-top: 24px;
}

.countries-block__add {
  background-color: rgb(100,50,25);
  padding: 10px 20px 12px;
  color: white;
  font-size: 18px;
  line-height: 22px;
  font-weight: 500;
  border-radius: 5px;
  min-width: 240px;
  width: 100%;
  max-width: 240px;
  transition: background-color 0.3s ease-in-out;
}

.countries-block__add:hover {
  background-color: rgb(150,75,40);
}

.countries-block__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.countries-block__input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid rgb(200,200,200);
  border-radius: 5px;
  font-size: 16px;
}
</style>
