import { createRouter, createWebHashHistory } from "@ionic/vue-router";
import { store } from "../store/index";
import Home from "../pages/Home.vue";
import AddPetPage from "../pages/AddPetPage.vue";
import MyPets from "../pages/MyPets.vue";
import ForbiddenFoodsPage from "../pages/ForbiddenFoodsPage.vue";
import Nutriscore from "../pages/NutriscorePage.vue";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/add-pet",
    name: "addPet",
    component: () => import("../pages/AddPetPage.vue"),
  },
  {
    path: "/edit-pet/:name",
    name: "edit-pet",
    component: () => import("../pages/EditPetPage.vue"),
  },
  {
    path: "/pets/list",
    name: "petsList",
    component: MyPets,
  },
  {
    path: "/forbidden-foods",
    name: "forbidden-foods",
    component: ForbiddenFoodsPage,
  },
  {
    path: "/nutriscore",
    name: "nutriscore",
    component: Nutriscore,
  },
  {
    path: "/create-dish",
    name: "create-dish",
    component: () => import("../pages/CreateDishPage.vue"),
  },
  {
    path: "/read-dish",
    name: "read-dish",
    component: () => import("../pages/ReadDishPage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from) => {
  console.log(to);
  if (
    // make sure there is an active pet
    !store.getters.getActivePet &&
    // ❗️ Avoid an infinite redirect
    to.name !== "addPet"
  ) {
    // redirect the user to the add pet page
    return { name: "addPet" };
  }
});

export default router;
