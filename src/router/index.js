import { createRouter, createWebHistory } from '@ionic/vue-router';
import { store } from '../store/index'
import Home from '../pages/Home.vue'
import AddPetPage from '../pages/AddPetPage.vue'
import MyPets from '../pages/MyPets.vue'
import ForbiddenFoodsPage from '../pages/ForbiddenFoodsPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/add-pet',
    name: 'addPet',
    component: AddPetPage
  },
  {
    path:'/pets/list',
    name: 'petsList',
    component: MyPets
  },
  {
    path: '/forbidden-foods',
    name: 'forbidden-foods',
    component: ForbiddenFoodsPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from) => {
	if (
	  // make sure there is an active pet
	  !store.getters.getActivePet &&
	  // ❗️ Avoid an infinite redirect
	  to.name !== 'addPet'
	) {
	  // redirect the user to the add pet page
	  return { name: 'addPet' }
	}
  })

export default router
