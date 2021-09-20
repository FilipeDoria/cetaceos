<script setup lang="ts">

// const savedForm = JSON.parse(localStorage.getItem('formData'))
const form = [
  { $id: '0', savedName: '', company: 'H2O Madeira', ship: 'Cetus', longitude: '-16.90046', latitude: '32.67018', seaConditions: '1', date: '2021-09-19', time: '17:04', valid: true },
  { $id: '1', savedName: '', company: 'H2O Madeira', ship: 'Cetus', longitude: '-16.90046', latitude: '32.67018', seaConditions: '1', date: '2021-09-19', time: '17:04', valid: true },
  { $id: '2', savedName: '', company: 'H2O Madeira', ship: 'Cetus', longitude: '-16.90046', latitude: '32.67018', seaConditions: '1', date: '2021-09-19', time: '17:04', valid: true },
  { $id: '3', savedName: '', company: 'H2O Madeira', ship: 'Cetus', longitude: '-16.90046', latitude: '32.67018', seaConditions: '1', date: '2021-09-19', time: '17:04', valid: true },
]

const { t } = useI18n()

function exportData() {
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
    The form bellow is a fake form, feature //TODO to read records history from local storage
  </div>
  <div class="py-4" />
  <div class="table">
    <div class="table-header-group">
      <div class="table-row">
        <div v-for="key in Object.keys(form[0])" :key="key" class="table-cell">
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
