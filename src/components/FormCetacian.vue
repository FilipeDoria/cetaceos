<script setup lang="ts">
const specie = ref('')
const total = 0
const child = 0
const behaviour = ref('')
const reaction = ref('')
const observations = ref('')
const otherInfo = ref('')

const mysticetisSpeciesOptions = [
  { text: 'Baleia Comum', value: '0' },
  { text: 'Baleia de Bryde', value: '1' },
  { text: 'Baleia Sardinheira', value: '2' },
  { text: 'Baleia Azul', value: '3' },
  { text: 'Baleia de Bossa', value: '4' },
  { text: 'Baleia Anã', value: '5' },
  { text: 'Baleia Franca', value: '6' },
  { text: 'Outro', value: '7' },
]

const odontocetisSpeciesOptions = [
  { text: 'Golfinho Roaz', value: '0' },
  { text: 'Golfinho Pintado', value: '1' },
  { text: 'Golfinho Riscado', value: '2' },
  { text: 'Golfinho Comum', value: '3' },
  { text: 'Baleia Piloto Tropical Ou Golfinho Boca De Panela', value: '4' },
  { text: 'Baleia Piloto De Barbatanas Longas', value: '5' },
  { text: 'Golfinho Caldeirão', value: '6' },
  { text: 'Golfinho Grampo', value: '7' },
  { text: 'Falsa Orca', value: '8' },
  { text: 'Orca', value: '9' },
  { text: 'Orca-Pigméia', value: '10' },
  { text: 'Golfinho Cabeça De Melão', value: '11' },
  { text: 'Golfinho De Fraser', value: '12' },
  { text: 'Baleia Cachalote', value: '13' },
  { text: 'Baleia Cachalote Anão', value: '14' },
  { text: 'Baleia Cachalote Pigmeu', value: '15' },
  { text: 'Baleia Bico De Blainville', value: '16' },
  { text: 'Baleia Bico De Cuvier Ou Zífio', value: '17' },
  { text: 'Baleia Bico De Gervais', value: '18' },
  { text: 'Baleia Bico De Sowerby', value: '19' },
  { text: 'Baleia Bico De Garrafa', value: '20' },
  { text: 'Outro', value: '21' },
]

const SpeciesOptions = []

const behaviourOptions = [
  { text: 'Deslocação', value: '0' },
  { text: 'Alimentação', value: '1' },
  { text: 'Repouso', value: '2' },
  { text: 'Socialização', value: '3' },
  { text: 'Outro', value: '4' },
]

const reactionOptions = [
  { text: 'Nenhuma/Indiferença', value: '0' },
  { text: 'Atração/aproximação', value: '1' },
  { text: 'Evitação/afastamento', value: '2' },
  { text: 'Outro', value: '3' },
]

const router = useRouter()
const path = computed(() => router.currentRoute.value.path)

function whichSpeciesToLoad() {
  console.log(path)
}

const { t } = useI18n()

// todo function child number cant be smaller than total number
// total number and child number can only be greater than 0/1
</script>

<template>
  <div>
    <p>Cetacian Form here</p>
    <label class="hidden" for="input">{{ t('species.whats-the-specie') }}</label>
    <select
      v-if="(path == '/form/misticetos') ? SpeciesOptions = mysticetisSpeciesOptions : SpeciesOptions = odontocetisSpeciesOptions"
      id=""
      v-model="specie"
      :placeholder="t('species.whats-the-specie')"
      name=""
      type="select"
      p="x-4 y-2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      required
    >
      <option value="" disabled select hidden>
        {{ t('species.whats-the-specie') }}
      </option>
      <option
        v-for="option in SpeciesOptions"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
    <div class="py-1">
      <label class="hidden" for="input">{{ t('species.otherInfo') }}</label>
      <input
        id="input"
        v-model="otherInfo"
        :placeholder="t('species.otherInfo')"
        type="string"
        autocomplete="false"
        p="x-4 y-2"
        w="250px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
      >
    </div>
    <div class="py-1">
      <label class="hidden" for="input">{{ t('species.total') }}</label>
      <input
        id="input"
        v-model="total"
        :placeholder="t('species.total')"
        type="number"
        autocomplete="false"
        p="x-4 y-2"
        w="250px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
      >
    </div>
    <div class="py-1">
      <label class="hidden" for="input">{{ t('species.child') }}</label>
      <input
        id="input"
        v-model="child"
        :placeholder="t('species.child')"
        type="number"
        autocomplete="false"
        p="x-4 y-2"
        w="250px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
      >
    </div>
    <div class="py-1">
      <label class="hidden" for="input">{{ t('species.behaviour') }}</label>
      <select
        id=""
        v-model="behaviour"
        :placeholder="t('species.behaviour')"
        name=""
        type="select"
        p="x-4 y-2"
        w="250px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
        required
      >
        <option value="" disabled select hidden>
          {{ t('species.behaviour') }}
        </option>
        <option v-for="option in behaviourOptions" :key="option.value" :value="option.value">
          {{ option.text }}
        </option>
      </select>
    </div>
    <div class="py-1">
      <label class="hidden" for="input">{{ t('species.reaction') }}</label>
      <select
        id=""
        v-model="reaction"
        :placeholder="t('species.reaction')"
        name=""
        type="select"
        p="x-4 y-2"
        w="250px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
        required
      >
        <option value="" disabled select hidden>
          {{ t('species.reaction') }}
        </option>
        <option v-for="option in reactionOptions" :key="option.value" :value="option.value">
          {{ option.text }}
        </option>
      </select>
    </div>
    <div class="py-1">
      <label class="hidden" for="input">{{ t('species.observations') }}</label>
      <input
        id="input"
        v-model="observations"
        :placeholder="t('species.observations')"
        type="string"
        autocomplete="false"
        p="x-4 y-2"
        w="250px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
      >
    </div>
  </div>
</template>
