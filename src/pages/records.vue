<script setup async lang="ts">

const { t } = useI18n()

let cetaceans = ref([])
let tableHeader = ref([])
const router = useRouter()

const load = async() => {
  cetaceans = JSON.parse(localStorage.getItem('formData'))
  if (cetaceans.length > 0)
    tableHeader = Object.keys(cetaceans[0])
}

load()

const error = ref(null)

async function exportData() {
  const form = cetaceans
  console.log(form)
  let csvString = '' // initializing the final form string for the excel
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
  // const csvFile = new Blob([csvString], { type: 'text/csv' })
  const downloadLink = document.createElement('a')
  downloadLink.download = 'avistamentos.csv'
  downloadLink.href = `data:text/csv;charset=utf-8,%EF%BB%BF${encodeURI(csvString)}`
  downloadLink.style.display = 'none'
  document.body.appendChild(downloadLink)
  downloadLink.click()
}
const deleteSighting = (id: Number) => {
  cetaceans = cetaceans.filter((ele) => {
    return ele.id != id
  })
  localStorage.setItem('formData', JSON.stringify(cetaceans))
  router.go('/')
}
</script>

<template>
  <div v-if="(cetaceans == undefined || cetaceans.length==0)">
    {{ t('button.no-data') }}
  </div>

  <!-- <div id="table-demo" class="container">
    <table :class="{'with-header': `${true}`}">
      <tr :class="{bold: true}">
        <td
          v-for="key in tableHeader"
          :key="key"
        >
          {{ key }}
        </td>
      </tr>
      <tr v-for="cetacean in cetaceans" :key="cetacean" class="table-row">
        <td v-for="key in cetacean" :key="key.id" class="table-cell">
          {{ key }}
        </td>
      </tr>
    </table>
  </div> -->

  <!-- component -->
  <div v-else>
    <section class="container mx-auto font-mono">
      <div class="w-full mb-4 overflow-hidden rounded-lg shadow-lg">
        <div class="w-full overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th class="px-1 py-1 text-center">
                  Id
                </th>
                <th class="px-1 py-1 text-center">
                  {{ t('records.company') }}
                </th>
                <th class="px-1 py-1 text-center">
                  {{ t('records.ship') }}
                </th><th class="px-1 py-1 text-center">
                  {{ t('records.date') }}
                </th>
                <th class="px-1 py-1 text-center">
                  {{ t('records.time') }}
                </th>
                <th class="px-1 py-1 text-center">
                  {{ t('records.sea_conditions') }}
                </th>
                <th class="px-1 py-1 text-center">
                  {{ t('records.latitude') }}
                </th>
                <th class="px-1 py-1 text-center">
                  {{ t('records.longitude') }}
                </th>
                <th class="px-1 py-1 text-center">
                  {{ t('records.species') }}
                </th>
                <th class="px-1 py-1 text-center">
                  {{ t('records.total') }}
                </th>
                <th class="px-1 py-1 text-center">
                  {{ t('records.children') }}
                </th>
                <th class="px-1 py-1 text-center">
                  {{ t('records.behaviour') }}
                </th>
                <th class="px-1 py-1 text-center">
                  {{ t('records.reaction') }}
                </th>
                <th class="px-1 py-1 text-center">
                  {{ t('records.other_info') }}
                </th>
                <th class="px-1 py-1 text-center">
                  {{ t('records.other_species') }}
                </th>
                <th class="px-1 py-1 text-center">
                  {{ t('records.actions') }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr v-for="cetacean in cetaceans" :key="cetacean" class="text-gray-700">
                <td v-for="key in cetacean" :key="key" class="px-1 py-1 text-center text-sm border">
                  {{ key }}
                </td>
                <td class="px-1 py-1 text-center text-sm border">
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded m-1" @click="editSighting(cetacean.id)">
                    Edit
                  </button>
                  <button
                    class="
                bg-red-500
                hover:bg-red-700
                text-white
                font-bold
                py-1 px-2
                border
                border-red-500
                rounded"
                    @click="deleteSighting(cetacean.id)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>

  <button
    class="m-3 text-sm btn"
    :disabled="cetaceans == undefined || cetaceans.length==0"
    @click="exportData()"
  >
    {{ t('button.export-data') }}
  </button>
</template>
