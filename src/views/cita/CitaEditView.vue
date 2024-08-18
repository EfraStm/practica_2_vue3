<template>
  <div>
    <h2>Editar Cita</h2>
    <form @submit.prevent="updateCita">
      <div>
        <label>Paciente</label>
        <select v-model="cita.pacienteId" required>
          <option v-for="paciente in pacientes" :key="paciente.id" :value="paciente.id">
            {{ paciente.nombre }}
          </option>
        </select>
      </div>
      <div>
        <label>Odontólogo</label>
        <select v-model="cita.odontologoId" required>
          <option v-for="odontologo in odontologos" :key="odontologo.id" :value="odontologo.id">
            {{ odontologo.nombre }}
          </option>
        </select>
      </div>
      <div>
        <label>Fecha</label>
        <input type="date" v-model="cita.fecha" required />
      </div>
      <div>
        <label>Hora</label>
        <input type="time" v-model="cita.hora" required />
      </div>
      <div>
        <label>Motivo</label>
        <input type="text" v-model="cita.motivo" required />
      </div>
      <button type="submit" class="btn btn-primary">Actualizar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CitaEditView',
  props: {
    cita: Object
  },
  data() {
    return {
      pacientes: [],
      odontologos: []
    }
  },
  methods: {
    fetchPacientes() {
      this.axios.get(`${this.baseUrl}/pacientes`)
        .then(response => {
          this.pacientes = response.data;
        })
        .catch(error => {
          console.error("Error fetching pacientes:", error);
        });
    },
    fetchOdontologos() {
      this.axios.get(`${this.baseUrl}/odontologos`)
        .then(response => {
          this.odontologos = response.data;
        })
        .catch(error => {
          console.error("Error fetching odontologos:", error);
        });
    },
    updateCita() {
      this.axios.put(`${this.baseUrl}/citas/${this.cita.id}`, this.cita)
        .then(() => {
          this.$emit('on-update'); // Emitir evento para cerrar el modal
          this.$toast.show("Cita actualizada.", "info");
        })
        .catch(error => {
          console.error("Error updating cita:", error);
        });
    }
  },
  computed: {
    baseUrl() {
      return this.$store.getters.getBaseUrl;
    }
  },
  mounted() {
    this.fetchPacientes();
    this.fetchOdontologos();
  }
}
</script>

<style scoped>
/* Puedes añadir estilos específicos aquí si es necesario */
</style>
