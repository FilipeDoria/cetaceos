<script setup lang="ts">
import { useUserStore } from '~/stores/form'

const form = useUserStore()
// const router = useRouter()
const go = () => {
  if (form.seaConditions) {
    form.valid = !form.valid
    // to save form items on local storage to formData variable
    localStorage.setItem('formData', JSON.stringify(form))
    // eslint-disable-next-line no-console
    console.log(`Form values saved on localStorage: ${localStorage.getItem('formData')}`)
  }
}

function getPosition() {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  }

  // to save form items on local storage to formData variable
  navigator.geolocation.getCurrentPosition(success, error, options)
}

function success(pos) {
  const crd = pos.coords

  console.log('Your current position is:')
  console.log(`Latitude : ${crd.latitude}`)
  console.log(`Longitude: ${crd.longitude}`)
  console.log(`More or less ${crd.accuracy} meters.`)
  form.latitude = pos.coords.latitude.toFixed(5)
  form.longitude = pos.coords.longitude.toFixed(5)
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`)
}

const { t } = useI18n()

form.company = 'H2O Madeira'
form.ship = 'Cetus'
</script>

<template>
  <div class="p-1">
    <div class="py-1">
      <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>
      <input
        id="input"
        v-model="form.company"
        :placeholder="t('intro.whats-the-company-name')"
        :aria-label="t('intro.whats-your-name')"
        type="text"
        autocomplete="false"
        p="x-4 y-2"
        w="250px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
      >
    </div>
    <div class="py-1">
      <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>
      <input
        id="input"
        v-model="form.ship"
        :placeholder="t('intro.whats-the-ship-name')"
        :aria-label="t('intro.whats-your-name')"
        type="text"
        autocomplete="false"
        p="x-4 y-2"
        w="250px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
      >
    </div>
    <div class="py-1">
      <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>
      <input
        id="input"
        v-model="form.date"
        :placeholder="t('intro.whats-the-ship-name')"
        :aria-label="t('intro.whats-your-name')"
        type="date"
        autocomplete="false"
        p="x-4 y-2"
        w="250px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
      >
    </div>
    <div class="py-1">
      <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>
      <input
        id="input"
        v-model="form.time"
        :placeholder="t('intro.whats-the-ship-name')"
        :aria-label="t('intro.whats-your-name')"
        type="time"
        autocomplete="false"
        p="x-4 y-2"
        w="250px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
      >
    </div>
    <div class="py-1">
      <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>
      <input
        id="input"
        v-model="form.latitude"
        :placeholder="t('intro.whats-the-latitude')"
        :aria-label="t('intro.whats-your-name')"
        type="number"
        autocomplete="false"
        p="x-4 y-2"
        w="250px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
      >
    </div>
    <div class="py-1">
      <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>
      <input
        id="input"
        v-model="form.longitude"
        :placeholder="t('intro.whats-the-longitude')"
        :aria-label="t('intro.whats-your-name')"
        type="number"
        autocomplete="false"
        p="x-4 y-2"
        w="250px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
      >
    </div>
    <div class="py-1">
      <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>
      <input
        id="input"
        v-model="form.seaConditions"
        :placeholder="t('intro.whats-the-sea-like')"
        :aria-label="t('intro.whats-your-name')"
        type="options"
        autocomplete="false"
        p="x-4 y-2"
        w="250px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
      >
    </div>

    <div>
      <button
        class="m-3 text-sm btn"
        @click="getPosition"
      >
        {{ t('button.position') }}
      </button>
      <button
        class="m-3 text-sm btn"
        :disabled="!form.seaConditions"
        @click="go"
      >
        {{ t('button.go') }}
      </button>
    </div>

    <span v-if="form.valid">
      Form values saved on localStorage:
      {{ form.company }}
      {{ form.ship }}
      {{ form.date }}
      {{ form.time }}
      {{ form.latitude }}
      {{ form.longitude }}
      {{ form.seaConditions }}
    </span>
  </div>
</template>
