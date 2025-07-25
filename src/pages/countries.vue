<script setup lang="ts">
import { computed } from "vue"
import { useQuery } from "@vue/apollo-composable"
import gql from "graphql-tag"
import CountriesBlock from "@components/countries/CountriesBlock.vue";

const getCountries = gql`
  query GetCountries {
    countries {
      code
      name
      emoji
    }
  }
`

const { result, loading, error } = useQuery<Countries>(getCountries)

const countries = computed<Country[]>(() => {
  if(result.value && result.value.countries && result.value.countries.length > 0) {
    return result.value.countries
  }

  return [
    {
      code: '',
      name: '',
      emoji: '',
    }
  ]
})
</script>

<template>
  <main class="countries">
    <span v-if="loading" class="countries__loading">Загрузка...</span>
    <span v-else-if="error" class="countries__error">{{ error }}</span>
    <CountriesBlock :countries class="countries__block" v-else />
  </main>
</template>

<style scoped>
.countries {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.countries__loading {
  font-size: 24px;
  text-align: center;
}

.countries__error {
  color: red;
  font-size: 24px;
  text-align: center;
}
</style>
