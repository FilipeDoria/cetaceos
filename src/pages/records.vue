<script setup lang="ts">
import XLSX from 'xlsx'
import { useUserStore } from '~/stores/user'

const user = useUserStore()
const name = ref(user.savedName)

const router = useRouter()

// const savedForm = JSON.parse(localStorage.getItem('formData'))
const form = [
  { $id: '0', savedName: '', company: 'H2O Madeira', ship: 'Cetus', longitude: '-16.90046', latitude: '32.67018', seaConditions: '1', date: '2021-09-19', time: '17:04', valid: true },
  { $id: '1', savedName: '', company: 'H2O Madeira', ship: 'Cetus', longitude: '-16.90046', latitude: '32.67018', seaConditions: '1', date: '2021-09-19', time: '17:04', valid: true },
  { $id: '2', savedName: '', company: 'H2O Madeira', ship: 'Cetus', longitude: '-16.90046', latitude: '32.67018', seaConditions: '1', date: '2021-09-19', time: '17:04', valid: true },
  { $id: '3', savedName: '', company: 'H2O Madeira', ship: 'Cetus', longitude: '-16.90046', latitude: '32.67018', seaConditions: '1', date: '2021-09-19', time: '17:04', valid: true },
]

const { t } = useI18n()

function exportData() {
  const Head = [Object.keys(form[0])]

  const row = [
    { key1: 1, key2: 2, key3: 3, key4: 4 },
    { key1: 2, key2: 5, key3: 6, key4: 7 },
    { key1: 3, key2: 2, key3: 3, key4: 4 },
    { key1: 4, key2: 2, key3: 3, key4: 4 },
    { key1: 5, key2: 2, key3: 3, key4: 4 },
  ]

  for (let entry = 0; entry < form.length; ++entry) {
    for (let key = 0; key < form[entry].length; ++key) {
      Head.push([
        form[entry].key,
      ])
    }
  }

  const csvRows = []
  for (let cell = 0; cell < Head.length; ++cell)
    csvRows.push(Head[cell].join(','))

  const csvString = csvRows.join('\n')
  const csvFile = new Blob([csvString], { type: 'text/csv' })
  const downloadLink = document.createElement('a')
  downloadLink.download = 'MYCSVFILE.csv'
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
