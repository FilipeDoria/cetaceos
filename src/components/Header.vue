<script setup lang="ts">
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
  </div>
</template>
