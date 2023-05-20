import pets from '../mocks/ui.json'
import nutriscoreRankings from '../mocks/nutriscore.json'


export const Api =  {
    getPets(){
        return pets
    },
    getForbiddenFoods(type){
        console.log(type)
        let pet = pets.find((el)=>{
            return el.tipo == type
        })
        return pet.alimentiVietati
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
    },
    getNutriscoreRanking(barcode){
        const product = nutriscoreRankings.find(function(el){
            return el.barcode == barcode
        })
        if (!product){
            return null
        } 
        return product
    }
}