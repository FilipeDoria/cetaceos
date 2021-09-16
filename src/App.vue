<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
const { t } = useI18n()

useHead({
  title: t('general.title'),
  meta: [
    { name: 'description', content: t('intro.desc') },
  ],
})
</script>

<template>
  <router-view />
</template>
