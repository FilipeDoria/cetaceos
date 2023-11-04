<script setup lang="ts">
import { useCetaceanStore } from '~/stores/cetacean'

const cetacean = useCetaceanStore()

const router = useRouter()
const path = computed(() => router.currentRoute.value.path).value

const { t } = useI18n()

const mysticetosSpeciesOptions = [
  { text: 'Baleia Comum', value: 'baleia comum' },
  { text: 'Baleia de Bryde', value: 'baleia de bryde' },
  { text: 'Baleia Sardinheira', value: 'baleia sardinheira' },
  { text: 'Baleia Azul', value: 'baleia azul' },
  { text: 'Baleia de Bossa', value: 'baleia de bossa' },
  { text: 'Baleia Anã', value: 'baleia anã' },
  { text: 'Outro', value: 'outro' },
]

const odontocetisSpeciesOptions = [
  { text: 'Golfinho Roaz', value: 'goldinho roaz' },
  { text: 'Golfinho Pintado', value: 'golfinho pintado' },
  { text: 'Golfinho Riscado', value: 'golfinho riscado' },
  { text: 'Golfinho Comum', value: 'golfinho comum' },
  { text: 'Baleia Piloto', value: 'baleia piloto' },
  { text: 'Golfinho Caldeirão', value: 'golfinho caldeirão' },
  { text: 'Golfinho Grampo', value: 'golfinho grampo' },
  { text: 'Falsa Orca', value: 'falsa orca' },
  { text: 'Orca', value: 'orca' },
  { text: 'Orca-Pigméia', value: 'orca-pigmeia' },
  { text: 'Golfinho Cabeça De Melão', value: 'golfinho cabeça de melão' },
  { text: 'Golfinho De Fraser', value: 'golfinho de fraser' },
  { text: 'Baleia Cachalote', value: 'baleia cachalote' },
  { text: 'Baleia Cachalote Anão', value: 'baleia cachalote anão' },
  { text: 'Baleia Cachalote Pigmeu', value: 'baleia cachalote pigmeu' },
  { text: 'Baleia Bico De Blainville', value: 'baleia bico de Blainville' },
  { text: 'Baleia Bico De Cuvier Ou Zífio', value: 'baleia bico de cuvier' },
  { text: 'Baleia Bico De Gervais', value: 'baleia de bico de gervais' },
  { text: 'Baleia Bico De Sowerby', value: 'baleia de bico de sowerby' },
  { text: 'Baleia Bico De Garrafa', value: 'baleia de bico de garrafa' },
  { text: 'Outro', value: 'outro' },
]

let options
if (path === '/form/mysticetis')
  options = mysticetosSpeciesOptions

else options = odontocetisSpeciesOptions

const behaviourOptions = [
  { text: 'Deslocação', value: 'deslocacao' },
  { text: 'Alimentação', value: 'alimentacao' },
  { text: 'Repouso', value: 'repouso' },
  { text: 'Socialização', value: 'socializacao' },
  { text: 'Outro', value: 'outro' },
]
const reactionOptions = [
  { text: 'Nenhuma/Indiferença', value: 'nenhuma / indiferença' },
  { text: 'Atração/aproximação', value: 'atração / aproximação' },
  { text: 'Evitação/afastamento', value: 'evitação / afastamento' },
  { text: 'Outro', value: 'outro' },
]

// this checks the value and updates it on the control, if needed
function checkValue() {
  if (cetacean.children > cetacean.total)
    cetacean.children = cetacean.total
}

// todo function child number cant be smaller than total number
// total number and child number can only be greater than 0/1
</script>

<template>
  <div>
    <div class="py-1">
      <select
        v-model="cetacean.specie"
        p="x-4 y-2"
        w="320px"
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
          v-for="option in options"
          :key="option.value"
          style="background: #000;"
          text-align="center"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
      <div class="py-1">
        <label class="hidden" for="input">{{ t('species.otherSpecies') }}</label>
        <input
          v-if="cetacean.specie === 'outro'"
          id="input"
          v-model="cetacean.otherSpecies"
          :placeholder="t('species.otherSpecies')"
          type="string"
          autocomplete="off"
          p="x-4 y-2"
          w="320px"
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
        v-model.number="cetacean.total"
        :placeholder="t('species.total')"
        type="number"
        min="1"
        step="1"
        autocomplete="off"
        p="x-4 y-2"
        w="320px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
        required
      >
      <div class="py-1">
        <label class="hidden" for="input">{{ t('species.child') }}</label>
        <input
          v-if="typeof cetacean.total !== 'undefined'"
          id="input"
          v-model.number="cetacean.children"
          :placeholder="t('species.child')"
          min="0"
          step="1"
          autocomplete="off"
          type="number"
          p="x-4 y-2"
          w="320px"
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
        v-model="cetacean.behaviour"
        :placeholder="t('species.behaviour')"
        name=""
        p="x-4 y-2"
        w="320px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
        required
      >
        <option value="" disabled select hidden>
          {{ t('species.behaviour') }}
        </option>
        <option
          v-for="option in behaviourOptions"
          :key="option.value"
          :value="option.value"
          style="background: #000;"
          text-align="center"
          border="~ rounded gray-200 dark:gray-700"
        >
          {{ option.text }}
        </option>
      </select>
    </div>
    <div class="py-1">
      <label class="hidden" for="input">{{ t('species.reaction') }}</label>
      <select
        id=""
        v-model="cetacean.reaction"
        :placeholder="t('species.reaction')"
        name=""
        p="x-4 y-2"
        w="350px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
        required
      >
        <option value="" disabled select hidden>
          {{ t('species.reaction') }}
        </option>
        <option
          v-for="option in reactionOptions"
          :key="option.value"
          :value="option.value"
          style="background: #000;"
          text-align="center"
        >
          {{ option.text }}
        </option>
      </select>
    </div>
    <div class="py-1">
      <label class="hidden" for="input">{{ t('species.observations') }}</label>
      <input
        id="input"
        v-model="cetacean.observations"
        :placeholder="t('species.observations')"
        type="string"
        autocomplete="off"
        p="x-4 y-2"
        w="320px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
      >
    </div>
    <!-- <span>
      Form values <br />
      specie:{{ cetacean.coisa }}<br />
      total:{{ cetacean.total }}<br />
      child:{{ cetacean.child }}<br />
      behaviour:{{ cetacean.behaviour }}<br />
      reaction:{{ cetacean.reaction }}<br />
      observation:{{ cetacean.observations }}<br />
      otherSpecies:{{ cetacean.otherSpecies }}
    </span> -->
  </div>
</template>
