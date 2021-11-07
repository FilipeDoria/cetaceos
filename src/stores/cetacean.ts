import { acceptHMRUpdate, defineStore } from 'pinia'

export const useCetaceanStore = defineStore('cetacean', () => {
  const specie = ref('')
  let total: number
  let children: number
  const behaviour = ref('')
  const reaction = ref('')
  const observations = ref('')
  const otherSpecies = ref('')
  const otherInfo = ref('')

  return {
    specie,
    total,
    children,
    behaviour,
    reaction,
    observations,
    otherSpecies,
    otherInfo,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCetaceanStore, import.meta.hot))
