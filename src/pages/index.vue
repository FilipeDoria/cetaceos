<script setup lang="ts">
import { useFormStore } from '~/stores/form'

const user = useFormStore()
const name = ref(user.savedName)

const router = useRouter()

const { t } = useI18n()
</script>

<template>
  <div>
    <router-link class="btn m-3 text-sm mt-8" to="/cetacean" :title="t('button.cetacean')">
      {{ t('button.cetacean') }}
    </router-link>
    <router-link class="btn m-3 text-sm mt-8" to="/" :title="t('button.sea-bird')">
      {{ t('button.sea-bird') }}
    </router-link>
    <router-link class="btn m-3 text-sm mt-8" to="/" :title="t('button.lobo-marinho')">
      {{ t('button.lobo-marinho') }}
    </router-link>
    <router-link class="btn m-3 text-sm mt-8" to="/" :title="t('button.turtle')">
      {{ t('button.turtle') }}
    </router-link>
  </div>
</template>

<route lang="yaml">
meta:
  layout: index
</route>
