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
