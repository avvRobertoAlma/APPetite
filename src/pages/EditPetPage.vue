<template>
    <default-layout pageTitle="Modifica Pet" pageDefaultBackLink="/pets/list" :key="$store.getters.getPets.length">
        <EditAnimalForm @edit-pet="saveEditedPet" :editablePet="petToBeEdited" v-if="!loading"/>
    </default-layout>
</template>

<script>
import EditAnimalForm from '../components/pets/EditAnimalForm.vue'
export default {
    data(){
        return {
            loading:true,
            petToBeEdited: null
        }
    },
    components: {
        EditAnimalForm
    },
    ionViewWillEnter(){
        const name = this.$route.params.name
        const pets = this.$store.getters.getPets
        const idx = pets.findIndex(function (el) {
        return el.name == name;
      });
       
        this.petToBeEdited = pets[idx]
        this.loading=false
    },
    methods: {
        saveEditedPet(form) {
            console.log(form)
            this.$store.commit('EDIT_PET', form)
            this.$router.replace('/pets/list')
            }
            
            
        
    }
}

</script>