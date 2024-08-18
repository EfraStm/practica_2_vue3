import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PacienteView from '../views/paciente/PacienteView.vue'
import CitaView from '../views/cita/CitaView.vue'
import OdontlogoView from '../views/odontologo/OdontologoView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/paciente',
    name: 'paciente',
    component: PacienteView
  },

  {
    path: '/odontologo',
    name: 'odontologo',
    component: OdontlogoView
  },
  {
    path: '/cita',
    name: 'cita',
    component: CitaView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
