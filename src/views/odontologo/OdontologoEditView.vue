<template>
  <div>
    <h2>Editar Odontólogo</h2>
    <form @submit.prevent="update">
      <div>
        <label>Nombre</label>
        <input v-model="odontologo.nombre" required />
      </div>
      <div>
        <label>Especialidad</label>
        <input v-model="odontologo.especialidad" required />
      </div>
      <div>
        <label>Teléfono</label>
        <input v-model="odontologo.telefono" required />
      </div>
      <button type="submit" class="btn btn-primary">Actualizar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'OdontologoEditView',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // Clonación del objeto item para evitar mutaciones directas
      odontologo: { ...this.item }
    }
  },
  methods: {
    update() {
      this.axios.put(`${this.baseUrl}/odontologos/${this.odontologo.id}`, this.odontologo)
        .then(response => {
          this.$emit('on-update', response.data); // Notificar al componente padre de la actualización
        })
        .catch(error => {
          console.error("Error al actualizar el odontólogo:", error);
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
