<script lang="ts" setup>
const router = useRouter()
const path = computed(() => router.currentRoute.value.path)

</script>

<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <Header />
    <FormGeneral />
    <router-view />
    <FormCetacian />
    <Footer />
    <div class="mt-5 mx-auto text-center opacity-25 text-sm">
      [Form Layout]
    </div>
  </main>
</template>
