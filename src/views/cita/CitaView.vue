<template>
  <div>
    <Modal v-model:modelValue="showModalNuevo">
      <CitaNewView @on-save="handleSave" />
    </Modal>
    <Modal v-model:modelValue="showModalEdit">
      <CitaEditView @on-update="handleUpdate" :cita="itemToEdit" />
    </Modal>
    <h1>Lista de Citas</h1>
    <button @click="showModalNuevo = true" class="btn btn-primary">Nueva Cita</button>
    <button @click="buscar()" class="btn btn-lith" style="float:right">Buscar</button>
    <input type="search" style="float:right" v-model="textToSearch" @input="buscar">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Paciente</th>
          <th>Odontólogo</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Motivo</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in itemList" :key="index">
          <td>{{ 1 + index }}</td>
          <td>{{ getPacienteNombre(item.pacienteId) }}</td>
          <td>{{ getOdontologoNombre(item.odontologoId) }}</td>
          <td>{{ item.fecha }}</td>
          <td>{{ item.hora }}</td>
          <td>{{ item.motivo }}</td>
          <td>
            <button @click="edit(item)" class="btn btn-dark" style="margin-right: 15px;">Editar</button>
            <button @click="Eliminar(item.id)" class="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Modal from '../../components/Modal.vue'
import CitaNewView from './CitaNewView.vue'
import CitaEditView from './CitaEditView.vue'

export default {
  name: 'Cita',
  data() {
    return {
      showModalNuevo: false,
      showModalEdit: false,
      itemToEdit: null,
      textToSearch: '',
      itemList: [],
      pacientes: [],
      odontologos: []
    }
  },
  components: {
    Modal,
    CitaNewView,
    CitaEditView
  },
  methods: {
    ...mapActions(['increment']),
    getList() {
      this.axios.get(this.baseUrl + "/citas")
        .then(response => {
          const citasFiltradas = response.data.filter(cita => {
            const paciente = this.pacientes.find(p => p.id === cita.pacienteId);
            const odontologo = this.odontologos.find(o => o.id === cita.odontologoId);
            const pacienteNombre = paciente ? paciente.nombre.toLowerCase() : '';
            const odontologoNombre = odontologo ? odontologo.nombre.toLowerCase() : '';
            const searchTerm = this.textToSearch.toLowerCase();
            return pacienteNombre.includes(searchTerm) || odontologoNombre.includes(searchTerm);
          });
          this.itemList = citasFiltradas;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getPacientes() {
      this.axios.get(this.baseUrl + "/pacientes")
        .then(response => {
          this.pacientes = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getOdontologos() {
      this.axios.get(this.baseUrl + "/odontologos")
        .then(response => {
          this.odontologos = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getPacienteNombre(id) {
      const paciente = this.pacientes.find(p => p.id === id);
      return paciente ? paciente.nombre : 'Desconocido';
    },
    getOdontologoNombre(id) {
      const odontologo = this.odontologos.find(o => o.id === id);
      return odontologo ? odontologo.nombre : 'Desconocido';
    },
    edit(item) {
      this.itemToEdit = Object.assign({}, item);
      this.showModalEdit = true;
    },
    Eliminar(id) {
      if (confirm("¿Está seguro de eliminar el registro?")) {
        this.axios.delete(this.baseUrl + "/citas/" + id)
          .then(() => {
            this.getList();
            this.$toast.show("Registro eliminado.", "danger");
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    buscar() {
      this.getList();
    },
    handleSave() {
      this.getList();
      this.showModalNuevo = false;
      this.$toast.show('Cita agregada.', 'success');
    },
    handleUpdate() {
      this.getList();
      this.showModalEdit = false;
      this.itemToEdit = null;
      this.$toast.show('Cita actualizada.', 'info');
    }
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl
    }
  },
  mounted() {
    this.getList();
    this.getPacientes();
    this.getOdontologos();
  }
}
</script>

<style></style>
