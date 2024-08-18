<template>
  <Menu>
    <router-link to="/paciente">Pacientes</router-link>
    |
      <router-link to="/odontologo">Odontologos</router-link>
  
        |
      <router-link to="/cita">Citas</router-link>
  </Menu>
  <router-view/>
</template>



<script>
import  Menu from './components/Menu.vue'
export default{
  name:'App',
  data(){
    return{

    }
  },
  components:{
    Menu
  }
}

</script>
<style lang="scss">

</style>
