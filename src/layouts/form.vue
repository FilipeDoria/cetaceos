
<script setup lang="ts">
import { useFormStore } from '~/stores/form'
import { useCetaceanStore } from '~/stores/cetacean'
import { useRecordsStore } from '~/stores/records'
import Record from '~/types/Record'

const temp = localStorage.getItem('formData')
const data = temp === null ? [] : JSON.parse(temp)

const cetacean = useCetaceanStore()
const form = useFormStore()
const records = useRecordsStore()

const message = ref('')

function onSubmit() {
  // const newId = data.length
  const newObservation: Record = {
    id: data.length,
    company: form.company,
    ship: form.ship,
    date: form.date,
    time: form.time,
    seaConditions: form.seaConditions,
    latitude: form.latitude,
    longitude: form.longitude,
    specie: cetacean.specie,
    total: cetacean.total,
    children: cetacean.child,
    behaviour: cetacean.behaviour,
    reaction: cetacean.reaction,
    otherInfo: cetacean.otherInfo,
    otherSpecies: cetacean.otherSpecies,
  }

  data.push(newObservation)

  for (const item of records.records)
    data.push(item)

  console.log(`Form values saved on localStorage: ${newObservation}`)
  // to save form items on local storage to formData variable
  localStorage.setItem('formData', JSON.stringify(data))
  localStorage.setItem('newObservation', JSON.stringify(newObservation))
  console.log(`Form values saved on localStorage: ${localStorage.getItem('formData')}`)
  // await savingCetaceans()
  //   .then(() => console.log('Data saved in the DB'))
  //   .catch(err => console.log('Data saving failed!', err))
}

// let newRecords = ref<Record[]>([])

function getPosition() {
  // event.stopPropagation()
  // event.preventDefault()
  message.value = t('intro.location-message')
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  }

  // to save form items on local storage to formData variable
  navigator.geolocation.getCurrentPosition(success, error, options)
  message.value = t('intro.location-message')
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
  { text: '0 - Calmo (< 1 Kmh)', value: '0 - calmo' },
  { text: '1 - Aragem (1 - 5 Km/h)', value: '1 - aragem' },
  { text: '2 - Brisa Leve (6 - 11 Km/h)', value: '2 - brisa leve' },
  { text: '3 - Brisa Fraca (12 - 19 Km/h)', value: '3 - brisa fraca' },
  { text: '4 - Brisa Moderada (20 - 28 Km/h)', value: '4 - brisa moderada' },
  { text: '5 - Brisa Forte (29 - 38 Km/h)Two', value: '5 - brisa forte' },
  { text: '6 - Vento Fresco (39 - 49 Km/h)', value: '6 - vento fresco' },
]

form.company = 'H2O Madeira'
form.ship = 'Cetus'

function toDegreesMinutesAndSeconds(coordinate) {
  const absolute = Math.abs(coordinate)
  const degrees = Math.floor(absolute)
  const minutesNotTruncated = (absolute - degrees) * 60
  const minutes = Math.floor(minutesNotTruncated)
  // const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(3)
  // coordinate = `${degrees}° ${minutes}'${seconds}"`
  coordinate = `${degrees}° ${minutesNotTruncated.toFixed(3)}'`
  return coordinate
}

function multipleSpeciesLoader() {
  const newRecords = new Set<Record>()
  console.log(newRecords)
  console.log(form.multipleSpeciesNumber)
  for (let i = 0; i < form.multipleSpeciesNumber; i++) {
    const dummy: Record = {
      id: data.length + i + 1,
      company: form.company,
      ship: form.ship,
      date: form.date,
      time: form.time,
      seaConditions: form.seaConditions,
      latitude: form.latitude,
      longitude: form.longitude,
      specie: '',
      total: '',
      children: '',
      behaviour: '',
      reaction: '',
      otherInfo: '',
      otherSpecies: '',
    }
    console.log(`dummy object: ${JSON.stringify(dummy)}`)
    newRecords.add(dummy)
    console.log(`this is a new record: ${newRecords}`)
    // records.setNewRecord(dummy)
  }
  records.updateRecords(newRecords)
  console.log(`this is are the newRecords: ${records.records}`)
  // console.log(JSON.stringify(newRecords))
  form.multipleSpeciesNumber = form.multipleSpeciesNumber
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
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <Header />
    <div class="p-1">
      {{ t('form.header-message') }}
      <form action="/cetacean" method="">
        <div class="py-1">
          <label class="hidden" for="input">{{ t('intro.whats-the-company-name') }}</label>
          <input
            id="input"
            v-model="form.company"
            :placeholder="t('intro.whats-the-company-name')"
            type="text"
            autocomplete="off"
            p="x-4 y-2"
            w="320px"
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
            w="320px"
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
            w="auto"
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
            w="320px"
            text="center"
            bg="transparent"
            border="~ rounded gray-200 dark:gray-700"
            outline="none active:none"
            required
          >
            <option value="" disabled selected hidden>
              {{ t('intro.whats-the-sea-like') }}
            </option>
            <option
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              style="background: #000;"
              text-align="center"
            >
              {{ option.text }}
            </option>
          </select>
        </div>
        <div class="py-1">
          <label class="hidden" for="input">{{ t('intro.whats-the-latitude') }}</label>
          <input
            id="input"
            v-model="form.latitude"
            name=""
            :placeholder="t('intro.whats-the-latitude')"
            type="string"
            autocomplete="off"
            p="x-4 y-2"
            w="320px"
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
            w="320px"
            text="center"
            bg="transparent"
            border="~ rounded gray-200 dark:gray-700"
            outline="none active:none"
          >
          <p>{{ message }}</p>
          <button
            type="button"
            bg="dark-50"
            hover="bg-dark-100"
            p="x-2 y-2"
            class="m-2 text-sm btn"
            @click="getPosition"
          >
            {{ t('button.position') }}
          </button>
        </div>
        <FormCetacean />
        <div class="py-1" :hidden="!form.date || !form.time || !form.seaConditions || !form.latitude || !form.longitude || !cetacean.specie || !cetacean.total || !cetacean.behaviour || !cetacean.reaction">
          <div class="py-1 text-base">
            <label for="checkbox">{{ t('species.other-species') }}</label>
            <input
              id="checkbox"
              v-model="form.multipleSpecies"
              type="checkbox"
              border="~ rounded gray-200 dark:gray-700"
            >
            Yes
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
                @click="multipleSpeciesLoader()"
              >
                {{ t('button.ok') }}
              </button>
            </span>
          </div>
          <div v-if="records.records.size > 0">
            <div v-for="record, index in records.records" :key="record.id" class="py-1">
              Specie {{ index + 2 }}
              <FormSpecie :record="record" />
            </div>
          </div>

          <button
            class="m-4 text-sm btn"
            :disabled="!form.date || !form.time || !form.seaConditions || !form.latitude || !form.longitude || !cetacean.specie || !cetacean.total || !cetacean.behaviour || !cetacean.reaction "
            @click="onSubmit"
            @keyup.enter="onSubmit"
          >
            {{ t('button.submit') }}
          </button>
        </div>
      </form>
    </div>
    <Footer />
  </main>
</template>
