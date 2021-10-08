<script setup async lang="ts">
import { db } from '~/appdb'
import data from '~/data/db.json'
const { t } = useI18n()

let cetaceans = ref([])
let tableHeader = ref([])

const load = async() => {
  cetaceans = JSON.parse(localStorage.getItem('formData')).cetaceans
  console.log(cetaceans)
  tableHeader = Object.keys(cetaceans[0])
  console.log(tableHeader)
}

load()

const error = ref(null)

async function exportData() {
  const form = cetaceans
  console.log(form)
  let csvString = [] // initializing the final form string for the excel
  // const head = Object.keys(form[0]) // getting all the form keys in usage to fill the export first row
  tableHeader.forEach((key, index) =>
    (index === Object.values(tableHeader).length - 1) ? csvString += `${key}` : csvString += `${key},`,
  )
  csvString += '\n'

  form.forEach((element) => {
    Object.values(element).forEach((value, index) => {
      (index === Object.values(element).length - 1) ? csvString += `${value}` : csvString += `${value},`
    })
    csvString += '\n'
  })
  const csvFile = new Blob([csvString], { type: 'text/csv' })
  const downloadLink = document.createElement('a')
  downloadLink.download = 'avistamentos.csv'
  downloadLink.href = window.URL.createObjectURL(csvFile)
  downloadLink.style.display = 'none'
  document.body.appendChild(downloadLink)
  downloadLink.click()
}

</script>

<template>
  <div>
    <p>
      {{ t('records.title') }}
    </p>
  </div>
  <div class="py-4" />
  <div v-if="cetaceans"></div>
  <div v-else>
    Loading...
  </div>
  <div v-for="cetacean in cetaceans" :key="cetacean.id">
  </div>
  <div class="table center">
    <div class="table-header-group">
      <div class="table-row">
        <div
          v-for="key in tableHeader"
          :key="key"
          class="table-cell"
        >
          {{ key }}
        </div>
      </div>
    </div>
    <div v-for="cetacean in cetaceans" :key="cetacean" class="table-row-group">
      <div class="table-row">
        <div v-for="key in cetacean" class="table-cell">
          {{ key }}
        </div>
      </div>
    </div>
  </div>
  <!-- <div v-else-if="!form" class="py-4">
    <p>Data table</p>
  </div> -->
  <button
    class="m-3 text-sm btn"
    @click="exportData()"
  >
    {{ t('button.export-data') }}
  </button>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
