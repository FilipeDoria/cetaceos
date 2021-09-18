<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <p>{{ t('cetacean.choose-animal-class') }}</p>
  <div>
    <router-link class="btn m-3 text-sm mt-8" to="/form/odontocetos" :title="t('cetacean.odontocetos')">
      {{ t('cetacean.odontocetos') }}
    </router-link>
    <router-link class="btn m-3 text-sm mt-8" to="/form/misticetos" :title="t('cetacean.misticetos')">
      {{ t('cetacean.misticetos') }}
    </router-link>
  </div>
  <router-view />
</template>

<route lang="yaml">
meta:
  layout: index
</route>
