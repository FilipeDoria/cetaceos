import { acceptHMRUpdate, defineStore } from 'pinia'

export const useCetaceanStore = defineStore('cetacean', () => {
  const specie = ref('')
  let total: number
  let child: number
  const behaviour = ref('')
  const reaction = ref('')
  const observations = ref('')
  const otherSpecies = ref('')
  const otherInfo = ref('')

  return {
    specie,
    total,
    child,
    behaviour,
    reaction,
    observations,
    otherSpecies,
    otherInfo,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCetaceanStore, import.meta.hot))
