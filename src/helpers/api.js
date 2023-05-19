import pets from '../mocks/ui.json'


export const Api =  {
    getPets(){
        return pets
    },
    getForbiddenFoods(type){

    },
    getPetTypes(){
        let types = []
        for (let i=0; i<pets.length; i++){
            console.log(pets[i])
            types.push(pets[i].tipo)
        }
        console.log(types)
        return types
    },
    getPetRaces(type){
        console.log(type)
        let pet = pets.find((el)=>{
            return el.tipo == type
        })
        return pet.razze
    }
}