import { acceptHMRUpdate, defineStore } from 'pinia'

export const useCetaceanStore = defineStore('cetacean', () => {
  const coisa = ref('')
  let total: number
  let child: number
  const behaviour = ref('')
  const reaction = ref('')
  const observations = ref('')
  const otherSpecies = ref('')
  const otherInfo = ref('')

  return {
    coisa,
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
