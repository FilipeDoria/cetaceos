<script setup lang="ts">
import { isDark, toggleDark } from '~/logic'
const router = useRouter()
const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}

const path = computed(() => router.currentRoute.value.path)
</script>

<template>
  <nav class="text-xl mt-6">
    <div>
      <button
        v-if="path !== '/'"
        class="btn m-3 text-sm mt-8 bg-gray-600"
        @click="router.back()"
      >
        {{ t('button.back') }}
      </button>
    </div>
    <router-link class="icon-btn mx-2" to="/" :title="t('button.home')">
      <noto-seal />
    </router-link>

    <button class="icon-btn mx-2 !outline-none" :title="t('button.toggle_dark')" @click="toggleDark()">
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </button>

    <a class="icon-btn mx-2" :title="t('button.toggle_langs')" @click="toggleLocales">
      <carbon-language />
    </a>
  </nav>
</template>
