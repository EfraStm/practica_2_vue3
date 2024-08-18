<template>
  <div>
    <h2>Agregar Nueva Cita</h2>
    <form @submit.prevent="createCita">
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
      <button type="submit" class="btn btn-primary">Agregar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CitaNewView',
  data() {
    return {
      cita: {
        pacienteId: '',
        odontologoId: '',
        fecha: '',
        hora: '',
        motivo: ''
      },
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
    createCita() {
      this.axios.post(`${this.baseUrl}/citas`, this.cita)
        .then(() => {
          this.$emit('on-save'); // Emitir evento para cerrar el modal
          this.cita = {
            pacienteId: '',
            odontologoId: '',
            fecha: '',
            hora: '',
            motivo: ''
          };
          this.$toast.show('Cita agregada', 'success');
        })
        .catch(error => {
          console.error("Error creating cita:", error);
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

<style scoped></style>
