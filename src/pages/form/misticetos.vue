<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <div>
    <p class="text-4xl">
      <carbon-campsite class="inline-block" />
    </p>
    <p>
      {{ t('general.title') }}
    </p>
    <p>
      <em class="text-sm opacity-75">{{ t('intro.desc') }}</em>
    </p>

    <div class="py-4" />

    <p>Misticetos Form here</p>
  </div>
  <div>
    <button
      class="btn m-3 text-sm mt-8"
      @click="router.back()"
    >
      {{ t('button.back') }}
    </button>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
