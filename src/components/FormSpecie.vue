<script setup lang="ts">
import Record from '~/types/Record'

const props = defineProps<{
  records?: Record[]
  record: Record
}>()

const record = {
  company: 'H2O Madeira',
  ship: 'Cetus',
  date: '2021-09-29',
  time: '15:32',
  seaConditions: '3',
  latitude: '',
  longitude: '',
  specie: '',
  total: 0,
  children: 0,
  behaviour: '',
  reaction: '',
  otherInfo: '',
  otherspecies: '',
}

console.log(record)

const { t } = useI18n()

const specieOptions = [
  { text: 'Baleia Comum', value: '22' },
  { text: 'Baleia de Bryde', value: '23' },
  { text: 'Baleia Sardinheira', value: '24' },
  { text: 'Baleia Azul', value: '25' },
  { text: 'Baleia de Bossa', value: '26' },
  { text: 'Baleia Anã', value: '27' },
  { text: 'Baleia Franca', value: '28' },
  { text: 'Golfinho Roaz', value: '21' },
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
  { text: 'Outro', value: '0' },
]

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

// this checks the value and updates it on the control, if needed
function checkValue() {
  if (record.child > record.total)
    record.child = record.total
}

// todo function child number cant be smaller than total number
// total number and child number can only be greater than 0/1
</script>

<template>
  <div>
    <div class="py-1">
      <select
        v-model="record.specie"
        p="x-4 y-2"
        w="250px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
        required
      >
        <option value="" disabled selected hidden>
          {{ t('species.whats-the-specie') }}
        </option>
        <option
          v-for="option in specieOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
      <div class="py-1">
        <label class="hidden" for="input">{{ t('species.otherSpecies') }}</label>
        <input
          v-if="record.specie === '0'"
          id="input"
          v-model="record.otherSpecies"
          :placeholder="t('species.otherSpecies')"
          type="string"
          autocomplete="off"
          p="x-4 y-2"
          w="250px"
          text="center"
          bg="transparent"
          border="~ rounded gray-200 dark:gray-700"
          outline="none active:none"
        >
      </div>
    </div>
    <div class="py-1">
      <label class="hidden" for="input">{{ t('species.total') }}</label>
      <input
        id="input"
        v-model.number="record.total"
        :placeholder="t('species.total')"
        type="number"
        min="1"
        step="1"
        autocomplete="off"
        p="x-4 y-2"
        w="250px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
        required
      >
      <div class="py-1">
        <label class="hidden" for="input">{{ t('species.child') }}</label>
        <input
          v-if="typeof record.total !== 'undefined'"
          id="input"
          v-model.number="record.child"
          :placeholder="t('species.child')"
          min="0"
          step="1"
          autocomplete="off"
          type="number"
          p="x-4 y-2"
          w="250px"
          text="center"
          bg="transparent"
          border="~ rounded gray-200 dark:gray-700"
          outline="none active:none"
          required
          @input="checkValue()"
        >
      </div>
    </div>
    <div class="py-1">
      <label class="hidden" for="input">{{ t('species.behaviour') }}</label>
      <select
        id=""
        v-model="record.behaviour"
        :placeholder="t('species.behaviour')"
        name=""
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
        v-model="record.reaction"
        :placeholder="t('species.reaction')"
        name=""
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
        v-model="record.observations"
        :placeholder="t('species.observations')"
        type="string"
        autocomplete="off"
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
