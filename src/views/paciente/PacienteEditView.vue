<template>
    <div>
        <h2>Editar Paciente</h2>
        <form @submit.prevent="update">
            <div>
                <label>Nombre</label>
                <input v-model="paciente.nombre" required />
            </div>
            <div>
                <label>Dirección</label>
                <input v-model="paciente.direccion" required />
            </div>
            <div>
                <label>Teléfono</label>
                <input v-model="paciente.telefono" required />
            </div>
            <div>
                <label>Fecha Nacimiento</label>
                <input v-model="paciente.fecha_nacimiento" required />
            </div>
            
            <div>
                <label>Historia Clinica</label>
                <textarea v-model="paciente.historia_clinica" required rows="5" cols="50"></textarea>
            </div>
            <button type="submit">Actualizar</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'PacienteEditView',
    props: {
        item: Object
    },
    data() {
        return {
            paciente: Object.assign({}, this.item)
        }
    },
    methods: {
        update() {
            this.axios.put(this.baseUrl + "/pacientes/" + this.paciente.id, this.paciente)
                .then(response => {
                    this.$emit('on-update', response.data);
                })
                .catch(error => {
                    console.error(error);
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

<style></style>
