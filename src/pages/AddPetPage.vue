<template>
    <default-layout pageTitle="Crea Pet" pageDefaultBackLink="/pets/list">
        <CreateAnimalForm @save-pet="savePet" />
    </default-layout>
</template>

<script>
import CreateAnimalForm from '../components/pets/CreateAnimalForm.vue'
export default {
    components: {
        CreateAnimalForm
    },
    methods: {
        savePet(pet) {
            console.log(pet)
            this.$store.commit('ADD_PET', pet)
            console.log(this.$store.getters.getPets)
            if (this.$store.getters.getPets.length == 1) {
                console.log("setting active pet")
                this.$store.dispatch('SET_ACTIVE_PET', 0)
            }
            this.$router.replace('/pets/list')
        }
    }
}

</script>