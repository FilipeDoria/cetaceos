<script setup lang="ts">
import { get, set, update } from 'idb-keyval'
import { useUserStore } from '~/stores/form'
const form = useUserStore()

const message = ref('')
// const router = useRouter()
const go = async() => {
  if (form.seaConditions) {
    form.valid = !form.valid
    // to save form items on local storage to formData variable
    localStorage.setItem('formData', JSON.stringify(form))
    // eslint-disable-next-line no-console
    console.log(`Form values saved on localStorage: ${localStorage.getItem('formData')}`)
    await set('form1', form)
      .then(() => console.log('Data saved in the DB'))
      .catch(err => console.log('Data saving failed!', err))
  }
}

function getPosition() {
  message.value = 'Getting coordinates...'
  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  }

  // to save form items on local storage to formData variable
  navigator.geolocation.getCurrentPosition(success, error, options)
}

function success(pos) {
  const crd = pos.coords
  convertDMS(crd.latitude, crd.longitude)
  message.value = ''
}

function error(err) {
  message.value = err.message
}

const { t } = useI18n()

const options = [
  { text: '0 - Calmo (< 1 Kmh)', value: '0' },
  { text: '1 - Aragem (1 - 5 Km/h)', value: '1' },
  { text: '2 - Brisa Leve (6 - 11 Km/h)', value: '2' },
  { text: '3 - Brisa Fraca (12 - 19 Km/h)', value: '3' },
  { text: '4 - Brisa Moderada (20 - 28 Km/h)', value: '4' },
  { text: '5 - Brisa Forte (29 - 38 Km/h)Two', value: '5' },
  { text: '6 - Vento Fresco (39 - 49 Km/h)', value: '6' },
]

form.company = 'H2O Madeira'
form.ship = 'Cetus'
let misto = false

function toDegreesMinutesAndSeconds(coordinate) {
  const absolute = Math.abs(coordinate)
  const degrees = Math.floor(absolute)
  const minutesNotTruncated = (absolute - degrees) * 60
  const minutes = Math.floor(minutesNotTruncated)
  const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(3)
  coordinate = `${degrees}° ${minutes}'${seconds}"`
  return coordinate
}

function convertDMS(lat, lng) {
  let DMSLatitude = lat >= 0 ? 'N ' : 'S '
  const latitude = toDegreesMinutesAndSeconds(lat)
  DMSLatitude = DMSLatitude + latitude
  form.latitude = DMSLatitude

  let DMSLongitude = lng >= 0 ? 'E ' : 'W '
  const longitude = toDegreesMinutesAndSeconds(lng)
  DMSLongitude = DMSLongitude + longitude
  form.longitude = DMSLongitude
}

</script>

<template>
  <div class="p-1">
    {{ t('form.header-message') }}
    <div class="py-1">
      <label class="hidden" for="input">{{ t('intro.whats-the-company-name') }}</label>
      <input
        id="input"
        v-model="form.company"
        :placeholder="t('intro.whats-the-company-name')"
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
      <label class="hidden" for="input">{{ t('intro.whats-the-ship-name') }}</label>
      <input
        id="input"
        v-model="form.ship"
        :placeholder="t('intro.whats-the-ship-name')"
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
      <label class="" for="input">{{ t('intro.select-date') }}</label>
      <input
        id="input"
        v-model="form.date"
        :placeholder="t('intro.select-date')"
        aria-labelledby="date-label date-instructions"
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
      <label class="" for="input">{{ t('intro.select-time') }}</label>
      <input
        id="input"
        v-model="form.time"
        :placeholder="t('intro.select-time')"
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
      <label class="hidden" for="input">{{ t('intro.whats-the-sea-like') }}</label>
      <select
        id=""
        v-model="form.seaConditions"
        name=""
        p="x-4 y-2"
        w="250px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
        required
      >
        <option value="" disabled selected hidden>
          {{ t('intro.whats-the-sea-like') }}
        </option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.text }}
        </option>
      </select>
    </div>
    <div class="py-1">
      <label class="hidden" for="input">{{ t('intro.whats-the-latitude') }}</label>
      <input
        id="input"
        v-model="form.latitude"
        :placeholder="t('intro.whats-the-latitude')"
        type="string"
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
      <label class="hidden" for="input">{{ t('intro.whats-the-longitude') }}</label>
      <input
        id="input"
        v-model="form.longitude"
        :placeholder="t('intro.whats-the-longitude')"
        type="string"
        autocomplete="false"
        p="x-4 y-2"
        w="250px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
      >
    </div>
    {{ message }}

    <div>
      <button
        class="m-3 text-sm btn"
        @click="getPosition"
      >
        {{ t('button.position') }}
      </button>
      <button
        class="m-3 text-sm btn"
        :disabled="!form.seaConditions || !form.latitude || !form.date || !form.time || !form.ship || !form.company"
        @click="go"
      >
        {{ t('button.go') }}
      </button>
    </div>
<label for="checkbox">Avistamento misto? </label>
    <input type="checkbox" id="checkbox" v-model="misto" />

    <!-- <span v-if="!form.valid">
      Form values saved on localStorage:
      {{ form.company }}
      {{ form.ship }}
      {{ form.date }}
      {{ form.time }}
      {{ form.latitude }}
      {{ form.longitude }}
      {{ form.seaConditions }}
    </span> -->
  </div>
</template>
