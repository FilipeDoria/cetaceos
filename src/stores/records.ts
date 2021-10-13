// @ts-check
import { acceptHMRUpdate, defineStore } from 'pinia'
import Record from '~/types/Record'

export const useRecordsStore = defineStore('records', () => {
  const records = ref(new Set<Record>())
  // [
  // {
  //   id: 0,
  //   company: 'H2O Madeira',
  //   ship: 'Cetus',
  //   date: '2021-09-29',
  //   time: '15:32',
  //   seaConditions: '3',
  //   latitude: 'N 32° 40\'12.656"',
  //   longitude: 'W 16° 54\'1.651"',
  //   specie: '7',
  //   total: 1,
  //   children: 0,
  //   behaviour: '4',
  //   reaction: '',
  //   otherInfo: '',
  //   otherspecies: '',
  // },
  // ]

  function setNewRecord(newRecord: Record) {
    records.value.add(newRecord)
  }

  function updateRecords(newRecords: Set<Record>) {
    records.value = newRecords
  }

  return {
    records,
    setNewRecord,
    updateRecords,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useRecordsStore, import.meta.hot))
