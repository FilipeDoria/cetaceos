<script setup async lang="ts">
import { db } from '~/appdb'
const { t } = useI18n()

console.log(!window.indexedDB)

let form = null
// form = await db.cetaceans.toArray()

const tableHeader = (form == null) ? null : Object.keys(form[0])
console.log(tableHeader)

async function exportData() {
  form = await db.cetaceans.toArray()
  let csvString = [] // initializing the final form string for the excel
  const head = Object.keys(form[0]) // getting all the form keys in usage to fill the export first row
  head.forEach((key, index) =>
    (index === Object.values(head).length - 1) ? csvString += `${key}` : csvString += `${key},`,
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
  <div v-if="form" class="table center">
    <div class="table-header-group">
      <div class="table-row">
        <div v-for="key in tableHeader" class="table-cell">
          {{ key }}
        </div>
      </div>
    </div>
    <div v-for="entry in form" class="table-row-group">
      <div class="table-row">
        <div v-for="key in entry" class="table-cell">
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
