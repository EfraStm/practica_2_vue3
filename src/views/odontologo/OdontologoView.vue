<template>
  <div>
    <Modal v-model:modelValue="showModalNuevo">
      <OdontologoNewView @on-save="handleSave" />
    </Modal>
    <Modal v-model:modelValue="showModalEdit">
      <OdontologoEditView @on-update="handleUpdate" :item="itemToEdit" />
    </Modal>
    <h1>Lista de Odontólogos</h1>
    <button @click="showModalNuevo = true" class="btn btn-primary">Nuevo Odontólogo</button>
    <button @click="buscar()" class="btn btn-light" style="float:right">Buscar</button>
    <input type="search" style="float:right" v-model="textToSearch" @input="buscar" />
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Especialidad</th>
          <th>Teléfono</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in itemList" :key="index">
          <td>{{ 1 + index }}</td>
          <td>{{ item.nombre }}</td>
          <td>{{ item.especialidad }}</td>
          <td>{{ item.telefono }}</td>
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
import { mapState, mapGetters } from 'vuex'
import Modal from '../../components/Modal.vue'
import OdontologoNewView from './OdontologoNewView.vue'
import OdontologoEditView from './OdontologoEditView.vue'

export default {
  name: 'OdontologoView',
  data() {
    return {
      showModalNuevo: false,
      showModalEdit: false,
      itemToEdit: null,
      textToSearch: '',
      itemList: []
    }
  },
  components: {
    Modal,
    OdontologoNewView,
    OdontologoEditView
  },
  methods: {
    async getList() {
      try {
        const response = await this.axios.get(`${this.baseUrl}/odontologos`);
        const searchTerm = this.textToSearch.toLowerCase();
        this.itemList = response.data.filter(odontologo =>
          odontologo.nombre.toLowerCase().includes(searchTerm)
        );
      } catch (error) {
        console.error("Error al obtener la lista:", error);
      }
    },
    edit(item) {
      this.itemToEdit = { ...item }; // Clonación del objeto para evitar modificaciones accidentales
      this.showModalEdit = true;
    },
    async Eliminar(id) {
      if (confirm("¿Está seguro de eliminar el registro?")) {
        try {
          await this.axios.delete(`${this.baseUrl}/odontologos/${id}`);
          await this.getList();
          this.$toast.show("Registro eliminado.", "danger");
        } catch (error) {
          console.error(error);
        }
      }
    },
    buscar() {
      this.getList();
    },
    handleSave() {
      this.getList();
      this.showModalNuevo = false;
      this.$toast.show('Odontólogo agregado.', 'success');
    },
    handleUpdate() {
      this.getList();
      this.showModalEdit = false;
      this.itemToEdit = null;
      this.$toast.show('Odontólogo actualizado.', 'info');
    }
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl;
    }
  },
  mounted() {
    this.getList();
  }
}
</script>

<style scoped></style>
