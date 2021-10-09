<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <p>{{ t('cetacean.choose-animal-class') }}</p>
  <div>
    <router-link class="btn m-3 text-sm mt-8" to="/form/odontocetis" :title="t('cetacean.odontocetis')">
      {{ t('cetacean.odontocetis') }}
    </router-link>
    <router-link class="btn m-3 text-sm mt-8" to="/form/mysticetis" :title="t('cetacean.mysticetis')">
      {{ t('cetacean.mysticetis') }}
    </router-link>
  </div>
  <router-view />
</template>

<route lang="yaml">
meta:
  layout: index
</route>
