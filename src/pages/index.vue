<script setup lang="ts">
import { useUserStore } from '~/stores/form'

const user = useUserStore()
const name = ref(user.savedName)

const router = useRouter()

const { t } = useI18n()
</script>

<template>
  <div>
    <router-link class="btn m-3 text-sm mt-8" to="/form" :title="t('button.newForm')">
      {{ t('button.newForm') }}
    </router-link>
    <router-link class="btn m-3 text-sm mt-8" to="/records" :title="t('button.records')">
      {{ t('button.records') }}
    </router-link>
  </div>
</template>

<route lang="yaml">
meta:
  layout: index
</route>
