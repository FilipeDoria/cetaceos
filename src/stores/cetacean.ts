import { acceptHMRUpdate, defineStore } from 'pinia'

export const useCetaceanStore = defineStore('cetacean', () => {
  const coisa = ref('')
  let total
  let child
  const behaviour = ref('')
  const reaction = ref('')
  const observations = ref('')
  const otherSpecies = ref('')

  return {
    coisa,
    total,
    child,
    behaviour,
    reaction,
    observations,
    otherSpecies,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCetaceanStore, import.meta.hot))
