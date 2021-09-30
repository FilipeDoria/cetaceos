// @ts-check
import { defineStore } from 'pinia'

export const useRecordsStore = defineStore('records', () => {
  const records = []

  /**
   * Changes the current name of the user and saves the one that was used
   * before.
   *
   * @param name - new name to set
   */
  function updateRecords(newRecods) {
    records = newRecords
  }

  return {
    records,
    updateRecords,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useRecordsStore, import.meta.hot))
