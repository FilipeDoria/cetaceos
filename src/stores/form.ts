import { acceptHMRUpdate, defineStore } from 'pinia'

export const useFormStore = defineStore('form', () => {
  /**
   * Current named of the form.
   */
  const savedName = ref('')
  const previousNames = ref(new Set<string>())

  const usedNames = computed(() => Array.from(previousNames.value))
  const otherNames = computed(() => usedNames.value.filter(name => name !== savedName.value))

  const company = ref('')
  const ship = ref('')
  const longitude = ref('')
  const latitude = ref('')
  const seaConditions = ref('')
  let date
  let time
  const valid = false
  const multipleSpecies = false
  let multipleSpeciesNumber

  /**
   * Changes the current name of the user and saves the one that was used
   * before.
   *
   * @param name - new name to set
   */
  function setNewName(name: string) {
    if (savedName.value)
      previousNames.value.add(savedName.value)

    savedName.value = name
  }

  return {
    setNewName,
    otherNames,
    savedName,
    company,
    ship,
    longitude,
    latitude,
    seaConditions,
    date,
    time,
    valid,
    multipleSpecies,
    multipleSpeciesNumber,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useFormStore, import.meta.hot))
