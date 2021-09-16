<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const user = useUserStore()
const name = ref(user.savedName)

const router = useRouter()
const go = () => {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}

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

    <p>A new form will appear on this page</p>
    <router-link class="btn m-3 text-sm mt-8" to="/form/odontocetos" :title="t('cetacean.odontocetos')">
      {{ t('cetacean.odontocetos') }}
    </router-link>
    <router-link class="btn m-3 text-sm mt-8" to="/form/misticetos" :title="t('cetacean.misticetos')">
      {{ t('cetacean.misticetos') }}
    </router-link>
  </div>
  <router-view />
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
  layout: index
</route>
