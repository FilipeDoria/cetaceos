<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <Header />
    <suspense>
      <template #default>
        <router-view />
      </template>
      <template #fallback>
        <span>Loading...</span>
      </template>
    </suspense>
    <Footer />
    <div class="mt-5 mx-auto text-center opacity-25 text-sm">
      [Default Layout]
    </div>
  </main>
</template>
