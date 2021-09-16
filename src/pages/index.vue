<script setup lang="ts">
import { useUserStore } from '~/stores/form'

const user = useUserStore()
const name = ref(user.savedName)

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

    <div>
      <router-link class="btn m-3 text-sm mt-8" to="/form" :title="t('button.newForm')">
        {{ t('button.newForm') }}
      </router-link>
      <router-link class="btn m-3 text-sm mt-8" to="/records" :title="t('button.records')">
        {{ t('button.records') }}
      </router-link>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: index
</route>
