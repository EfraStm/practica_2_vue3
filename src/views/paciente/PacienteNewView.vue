<template>
    <div>
        <h2>Nuevo Paciente</h2>
        <form @submit.prevent="register">
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
            <button type="submit">Registrar</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'PacienteNewView',
    data() {
        return {
            paciente: {
                nombre: '',
                direccion: '',
                telefono: '',
                fecha_nacimiento:'',
                historia_clinica:''
            }
        }
    },
    methods: {
        register() {
            this.axios.post(this.baseUrl + "/pacientes", this.paciente)
                .then(response => {
                    this.$emit('on-register', response.data);
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
