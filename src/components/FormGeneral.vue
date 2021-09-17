<script setup lang="js">
export default {
  data() {
    return {
      formValues: {
        company: '',
        ship: '',
        especie: '',
        date: '',
        time: '',
        latitude: '',
        longitude: '',
        misto: false,
        total_individuos: '',
        crias: '',
        comportamento: '',
        reacao: '',
        estado_mar: '',
        observacoes: '',
      },
    }
  },
  methods: {
    handleSubmit() {
      // to save form items on local storage to userData variable
      localStorage.setItem('userData', JSON.stringify(this.formValues))
      console.log(`Form values saved on localStorage: ${localStorage.getItem('userData')}`)
    },
    loadInitialData(form) {
      navigator.geolocation.getCurrentPosition((pos) => {
        form.latitude = pos.coords.latitude.toFixed(5)
        form.longitude = pos.coords.longitude.toFixed(5)
      })
    },

  },
}
</script>

<template>
  <div>
    <h2>Ficha de registos de observações de cetáceos</h2>
    <p>Registe o máximo de informação possível.</p>
    <input
      v-model="formValues.company"
      name="company"
      label="Empresa"
      validation="required"
      placeholder="ACME"
    /><br />
    <input v-model="formValues.latitude" name="latitude" label="Latitude" validation="required" /><br />
    <input
      v-model="formValues.longitude"
      name="longitude"
      label="Longitude"
      validation="required"
    /><br />
    <button
      class="m-3 text-sm btn"
      @click="loadInitialData(formValues)"
    >
      Get Location
    </button>
    <h3>Values:</h3>
    {{ formValues.company }}
    {{ formValues.latitude }}
    {{ formValues.longitude }}
  </div>
</template>
