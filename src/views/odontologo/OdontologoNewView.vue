<template>
  <div>
    <h2>Agregar Nuevo Odontólogo</h2>
    <form @submit.prevent="createOdontologo">
      <div>
        <label>Nombre</label>
        <input type="text" v-model="odontologo.nombre" required />
      </div>
      <div>
        <label>Especialidad</label>
        <input type="text" v-model="odontologo.especialidad" required />
      </div>
      <div>
        <label>Teléfono</label>
        <input type="text" v-model="odontologo.telefono" required />
      </div>
      <button type="submit" class="btn btn-primary">Agregar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'OdontologoNewView',
  data() {
    return {
      odontologo: {
        nombre: '',
        especialidad: '',
        telefono: ''
      }
    }
  },
  methods: {
    createOdontologo() {
      this.axios.post(`${this.baseUrl}/odontologos`, this.odontologo)
        .then(() => {
          this.$emit('on-save'); // Emitir evento para cerrar el modal
          this.odontologo = {
            nombre: '',
            especialidad: '',
            telefono: ''
          };
          this.$toast.show('Odontólogo agregado', 'success');
        })
        .catch(error => {
          console.error("Error al crear el odontólogo:", error);
        });
    }
  },
  computed: {
    baseUrl() {
      return this.$store.getters.getBaseUrl;
    }
  }
}
</script>

<style scoped></style>
