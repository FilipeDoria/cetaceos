<script setup async lang="ts">

const { t } = useI18n()

let cetaceans = ref([])
let tableHeader = ref([])

const load = async() => {
  cetaceans = JSON.parse(localStorage.getItem('formData'))
  console.log(cetaceans)
  tableHeader = Object.keys(cetaceans[0])
  console.log(tableHeader)
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

const table = {
  bold: true,
  matrix: [
    [{ value: 'Fruit' }, { value: 'Vegetable' }, { value: 'Snacks' }, { value: 'Drinks' }, { value: 'Fruit' }, { value: 'Vegetable' }, { value: 'Snacks' }, { value: 'Drinks' }],
    [{ value: 'Apple' }, { value: 'Celery' }, { value: 'Chips' }, { value: 'Beer' }, { value: 'Apple' }, { value: 'Celery' }, { value: 'Chips' }, { value: 'Beer' }],
    [{ value: 'Banana' }, { value: 'Eggplant' }, { value: 'Candy' }, { value: 'Coke' }, { value: 'Apple' }, { value: 'Celery' }, { value: 'Chips' }, { value: 'Beer' }],
    [{ value: 'Oranges' }, { value: 'Squash' }, { value: 'Nuts' }, { value: 'Tea' }, { value: 'Apple' }, { value: 'Celery' }, { value: 'Chips' }, { value: 'Beer' }],
  ],
}
</script>

<template>
  <!-- component -->
  <table class="min-w-full border-collapse block md:">
    <thead class="block md:table-header-group">
      <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
        <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
          Name
        </th>
        <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
          User Name
        </th>
        <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
          Email Address
        </th>
        <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
          Mobile
        </th>
        <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
          Actions
        </th>
      </tr>
    </thead>
    <tbody class="block md:table-row-group">
      <tr class="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
          <span class="inline-block w-1/3 md:hidden font-bold">Name</span>Jamal Rios
        </td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
          <span class="inline-block w-1/3 md:hidden font-bold">User Name</span>jrios1
        </td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
          <span class="inline-block w-1/3 md:hidden font-bold">Email Address</span>jrios@icloud.com
        </td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
          <span class="inline-block w-1/3 md:hidden font-bold">Mobile</span>582-3X2-6233
        </td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
          <span class="inline-block w-1/3 md:hidden font-bold">Actions</span>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">
            Edit
          </button>
          <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded">
            Delete
          </button>
        </td>
      </tr>
      <tr class="bg-white border border-grey-500 md:border-none block md:table-row">
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
          <span class="inline-block w-1/3 md:hidden font-bold">Name</span>Erwin Campbell
        </td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
          <span class="inline-block w-1/3 md:hidden font-bold">User Name</span>ecampbell088
        </td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
          <span class="inline-block w-1/3 md:hidden font-bold">Email Address</span>ecampbell088@hotmail.com
        </td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
          <span class="inline-block w-1/3 md:hidden font-bold">Mobile</span>318-685-X414
        </td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
          <span class="inline-block w-1/3 md:hidden font-bold">Actions</span>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">
            Edit
          </button>
          <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded">
            Delete
          </button>
        </td>
      </tr>
      <tr class="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
          <span class="inline-block w-1/3 md:hidden font-bold">Name</span>Lillie Clark
        </td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
          <span class="inline-block w-1/3 md:hidden font-bold">User Name</span>lillie
        </td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
          <span class="inline-block w-1/3 md:hidden font-bold">Email Address</span>lillie.clark@gmail.com
        </td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
          <span class="inline-block w-1/3 md:hidden font-bold">Mobile</span>505-644-84X4
        </td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
          <span class="inline-block w-1/3 md:hidden font-bold">Actions</span>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">
            Edit
          </button>
          <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded">
            Delete
          </button>
        </td>
      </tr>
      <tr class="bg-white border border-grey-500 md:border-none block md:table-row">
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
          <span class="inline-block w-1/3 md:hidden font-bold">Name</span>Maribel Koch
        </td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
          <span class="inline-block w-1/3 md:hidden font-bold">User Name</span>maribelkoch
        </td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
          <span class="inline-block w-1/3 md:hidden font-bold">Email Address</span>mkoch@yahoo.com
        </td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
          <span class="inline-block w-1/3 md:hidden font-bold">Mobile</span>582-400-3X36
        </td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
          <span class="inline-block w-1/3 md:hidden font-bold">Actions</span>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">
            Edit
          </button>
          <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- component -->
  <section class="container mx-auto font-mono">
    <div class="w-full mb-4 overflow-hidden rounded-lg shadow-lg">
      <div class="w-full overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
              <th class="px-4 py-3">
                Date
              </th>
              <th class="px-4 py-3">
                Time
              </th>
              <th class="px-4 py-3">
                Species
              </th>
              <th class="px-4 py-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr class="text-gray-700">
              <td class="px-4 py-3 border">
                <div class="flex items-center text-sm">
                  <div class="relative w-8 h-8 mr-3 rounded-full md:block">
                    <img class="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                    <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                  </div>
                  <div>
                    <p class="font-semibold text-black">
                      Sufyan
                    </p>
                    <p class="text-xs text-gray-600">
                      Developer
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-ms font-semibold border">
                22
              </td>
              <td class="px-4 py-3 text-xs border">
                <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> Acceptable </span>
              </td>
              <td class="px-4 py-3 text-sm border">
                6/4/2000
              </td>
            </tr>
            <tr class="text-gray-700">
              <td class="px-4 py-3 border">
                <div class="flex items-center text-sm">
                  <div class="relative w-8 h-8 mr-3 rounded-full">
                    <img class="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                    <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                  </div>
                  <div>
                    <p class="font-semibold text-black">
                      Stevens
                    </p>
                    <p class="text-xs text-gray-600">
                      Programmer
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-md font-semibold border">
                27
              </td>
              <td class="px-4 py-3 text-xs border">
                <span class="px-2 py-1 font-semibold leading-tight text-orange-700 bg-gray-100 rounded-sm"> Pending </span>
              </td>
              <td class="px-4 py-3 text-sm border">
                6/10/2020
              </td>
            </tr>
            <tr class="text-gray-700">
              <td class="px-4 py-3 border">
                <div class="flex items-center text-sm">
                  <div class="relative w-8 h-8 mr-3 rounded-full">
                    <img class="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                    <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                  </div>
                  <div>
                    <p class="font-semibold">
                      Nora
                    </p>
                    <p class="text-xs text-gray-600">
                      Designer
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-md font-semibold border">
                17
              </td>
              <td class="px-4 py-3 text-xs border">
                <span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm"> Nnacceptable </span>
              </td>
              <td class="px-4 py-3 text-sm border">
                6/10/2020
              </td>
            </tr>
            <tr class="text-gray-700">
              <td class="px-4 py-3 border">
                <div class="flex items-center text-sm">
                  <div class="relative w-8 h-8 mr-3 rounded-full">
                    <img class="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                    <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                  </div>
                  <div>
                    <p class="font-semibold">
                      Ali
                    </p>
                    <p class="text-xs text-gray-600">
                      Programmer
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 border text-md font-semibold">
                23
              </td>
              <td class="px-4 py-3 border text-xs">
                <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> Acceptable </span>
              </td>
              <td class="px-4 py-3 border text-sm">
                6/10/2020
              </td>
            </tr>
            <tr class="text-gray-700">
              <td class="px-4 py-3 border">
                <div class="flex items-center text-sm">
                  <div class="relative w-8 h-8 mr-3 rounded-full">
                    <img class="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                    <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                  </div>
                  <div>
                    <p class="font-semibold">
                      Khalid
                    </p>
                    <p class="text-xs text-gray-600">
                      Designer
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 border text-md font-semibold">
                20
              </td>
              <td class="px-4 py-3 border text-xs">
                <span class="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-sm"> Pending </span>
              </td>
              <td class="px-4 py-3 border text-sm">
                6/10/2020
              </td>
            </tr>
            <tr class="text-gray-700">
              <td class="px-4 py-3 border">
                <div class="flex items-center text-sm">
                  <div class="relative w-8 h-8 mr-3 rounded-full">
                    <img class="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                    <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                  </div>
                  <div>
                    <p class="font-semibold">
                      Nasser
                    </p>
                    <p class="text-xs text-gray-600">
                      Pen Tester
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 border text-md font-semibold">
                29
              </td>
              <td class="px-4 py-3 border text-xs">
                <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> Acceptable </span>
              </td>
              <td class="px-4 py-3 border text-sm">
                6/10/2020
              </td>
            </tr>
            <tr class="text-gray-700">
              <td class="px-4 py-3 border">
                <div class="flex items-center text-sm">
                  <div class="relative w-8 h-8 mr-3 rounded-full">
                    <img class="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                    <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                  </div>
                  <div>
                    <p class="font-semibold">
                      Mohammed
                    </p>
                    <p class="text-xs text-gray-600">
                      Web Designer
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 border text-md font-semibold">
                38
              </td>
              <td class="px-4 py-3 border text-xs">
                <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> Acceptable </span>
              </td>
              <td class="px-4 py-3 border text-sm">
                6/10/2020
              </td>
            </tr>
            <tr class="text-gray-700">
              <td class="px-4 py-3 border">
                <div class="flex items-center text-sm">
                  <div class="relative w-8 h-8 mr-3 rounded-full">
                    <img class="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                    <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                  </div>
                  <div>
                    <p class="font-semibold">
                      Saad
                    </p>
                    <p class="text-xs text-gray-600">
                      Data
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 border text-md font-semibold">
                19
              </td>
              <td class="px-4 py-3 border text-xs">
                <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> Acceptable </span>
              </td>
              <td class="px-4 py-3 border text-sm">
                6/10/2020
              </td>
            </tr>
            <tr class="text-gray-700">
              <td class="px-4 py-3 border">
                <div class="flex items-center text-sm">
                  <div class="relative w-8 h-8 mr-3 rounded-full">
                    <img class="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                    <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                  </div>
                  <div>
                    <p class="font-semibold">
                      Sami
                    </p>
                    <p class="text-xs text-gray-600">
                      Developer
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 border text-md font-semibold">
                21
              </td>
              <td class="px-4 py-3 border text-xs">
                <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> Acceptable </span>
              </td>
              <td class="px-4 py-3 border text-sm">
                6/10/2020
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <button
    class="m-3 text-sm btn"
    :disabled="cetaceans == undefined"
    @click="exportData()"
  >
    {{ t('button.export-data') }}
  </button>
</template>

<style lang="scss" scoped>
$breakpoint: 361px;
#table-demo {
  margin: 20px 0;
  table{
    min-width: 300px;
    width: 100%;
    height: fit-content;
    overflow-y: scroll;
    border-collapse: collapse;
    border: 1px solid #000;
    tr {
      td {
        border: 1px solid #000;
        padding: 8px;
      }
    }
    .bold {
      border-right: none;
      border-left: none;
      background: #ddd;
      border-bottom: 1px solid #c2c2c2;
      border: none;
      td {
        border: none;
        background: #000;
        color: #fff;
        border: none;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
  .with-header {
    tr:first-of-type {
      td {
        border: none;
      }
    }
    @media (max-width: $breakpoint) {
      tr:first-of-type {
        display: none;
      }
      tr {
        border: 1px solid #000;
        td {
          display: block;
          border: none;
          padding: 1px;
          &:first-child {
            padding-top: .1em;
          }
          &:last-child {
            padding-bottom: .1em;
          }
          &:before {
            content: attr(data-th)": ";
            font-weight: bold;
            display: inline-block;
            @media (min-width: $breakpoint) {
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>
