
<script setup lang="ts">
import { db, Cetacean } from '~/appdb'
import { useFormStore } from '~/stores/form'
import { useCetaceanStore } from '~/stores/cetacean'
const form = useFormStore()
const cetacean = useCetaceanStore()

const message = ref('')

const onSubmit = async() => {
  // to save form items on local storage to formData variable
  localStorage.setItem('formData', JSON.stringify(form))
  console.log(`Form values saved on localStorage: ${localStorage.getItem('formData')}`)
  await savingCetaceans()
    .then(() => console.log('Data saved in the DB'))
    .catch(err => console.log('Data saving failed!', err))
}

function getPosition(event) {
  event.stopPropagation()
  event.preventDefault()
  message.value = t('intro.location-message')
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

async function savingCetaceans() {
  console.log('Seeding database with some cetaceans...')
  await db.transaction(
    'rw',
    db.cetaceans,
    async() => {
    // populate a cetacean
      await db.cetaceans.add(new Cetacean(
        form.company,
        form.ship,
        form.date,
        form.time,
        form.seaConditions,
        form.latitude,
        form.longitude,
        cetacean.coisa,
        cetacean.total,
        cetacean.child,
        cetacean.behaviour,
        cetacean.reaction,
        cetacean.otherInfo,
        cetacean.otherSpecies,
      ))
    },
  )
}
</script>
<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <Header />
    <div class="p-1">
      {{ t('form.header-message') }}
      <form action="/cetacean">
        <div class="py-1">
          <label class="hidden" for="input">{{ t('intro.whats-the-company-name') }}</label>
          <input
            id="input"
            v-model="form.company"
            :placeholder="t('intro.whats-the-company-name')"
            type="text"
            autocomplete="off"
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
            autocomplete="off"
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
            autocomplete="off"
            p="x-4 y-2"
            text="center"
            bg="transparent"
            border="~ rounded gray-200 dark:gray-700"
            outline="none active:none"
            required
          >
        </div>
        <div class="py-1">
          <label class="" for="input">{{ t('intro.select-time') }}</label>
          <input
            id="input"
            v-model="form.time"
            :placeholder="t('intro.select-time')"
            type="time"
            autocomplete="off"
            p="x-4 y-2"
            text="center"
            bg="transparent"
            border="~ rounded gray-200 dark:gray-700"
            outline="none active:none"
            required
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
            autocomplete="off"
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
            autocomplete="off"
            p="x-4 y-2"
            w="250px"
            text="center"
            bg="transparent"
            border="~ rounded gray-200 dark:gray-700"
            outline="none active:none"
          >
        </div>
        <p>{{ message }}</p>
        <button
          type="button"
          bg="dark-50"
          hover="bg-dark-100"
          p="x-2 y-2"
          class="m-3 text-sm btn"
          @click="getPosition"
        >
          {{ t('button.position') }}
        </button>
        <FormCetacean :form="form" @update:form="form = $event" />
        <div class="py-1">
          <label for="checkbox">{{ t('species.other-species') }}</label>
          <input
            id="checkbox"
            v-model="form.multipleSpecies"
            type="checkbox"
            border="~ rounded gray-200 dark:gray-700"
          >
          <span v-if="form.multipleSpecies" class="px-1">Yes</span>
          <span v-else-if="!form.multipleSpecies" class="px-1">No</span>
        </div>
        <div>
          <span v-if="form.multipleSpecies == true" class="px-2">
            <input
              id="input"
              v-model.number="form.multipleSpeciesNumber"
              :placeholder="t('species.species-count')"
              type="number"
              autocomplete="off"
              w="120px"
              p="x-2 y-2"
              text="center"
              bg="transparent"
              border="~ rounded gray-200 dark:gray-700"
              outline="none active:none"
              min="1"
            >
            <button
              type="button"
              p="x-2 y-2"
              bg="dark-50"
              hover="bg-dark-100"
              border="~ rounded green-900 dark:gray-700"
              class="m-3 text-sm btn"
              @click="onSubmit"
              @keyup.enter="onSubmit"
            >
              {{ t('button.ok') }}
            </button>
          </span>
        </div>
        <div>
          <span v-for="n in form.multipleSpeciesNumber">
            <div class="py-1">
              <p class="text">Species {{ n + 1 }}</p>
              <FormCetacean />
            </div>
          </span>
        </div>
        <button
          type="submit"
          class="m-3 text-sm btn"

          @click="onSubmit"
          @keyup.enter="onSubmit"
        >
          {{ t('button.submit') }}
        </button>
        <div class="mt-5 mx-auto text-center opacity-25 text-sm">
          [Form Layout]
        </div>
      </form>
    </div>
    <Footer />
  </main>
</template>
