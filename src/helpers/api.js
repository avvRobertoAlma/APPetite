import pets from "../mocks/ui.json";
import nutriscoreRankings from "../mocks/nutriscore.json";
import choices from "../mocks/foods.json"

export const Api = {
  getPets() {
    return pets;
  },
  getForbiddenFoods(type) {
    console.log(type);
    let pet = pets.find((el) => {
      return el.tipo == type;
    });
    return pet.alimentiVietati;
  },
  getPetTypes() {
    let types = [];
    for (let i = 0; i < pets.length; i++) {
      console.log(pets[i]);
      types.push(pets[i].tipo);
    }
    console.log(types);
    return types;
  },
  getPetRaces(type) {
    console.log(type);
    let pet = pets.find((el) => {
      return el.tipo == type;
    });
    return pet.razze;
  },
  getNutriscoreRanking(barcode) {
    const product = nutriscoreRankings.find(function (el) {
      return el.barcode == barcode;
    });
    console.log(product);
    if (!product) {
      return null;
    }
    return product;
  },
  getFoodChoicesPerRace(petRace){
    console.log(petRace)
    const _choices = choices[petRace]
    if (!_choices){
      return null
    }
    return _choices
  },
  getRecommendedDoses(petRace, weight, proteins, cereals, vitamins){
    /* recupera le possibili scelte per quella razza */
    const _choices = choices[petRace]

    /* recupera le scelte per le proteine */
    const proteine = _choices.proteine
    /* recupera le scelte per i cereali */
    const cereali = _choices.cereali
    /* recupera le scelte per le vitamine */
    const vitamine = _choices.vitamine

    /* imposta oggetto che conterrà le dosi consigliate */
    let recommendedDoses = {}

    for (let i=0; i< proteine.length;i++){
      if (proteins == proteine[i].nome){
        recommendedDoses.proteine = {
          nome: proteins,
          valore: weight * proteine[i].quantitàGrammiPerKgPeso
        }
        break
      }
    }

    if (!recommendedDoses.hasOwnProperty('proteine')){
      recommendedDoses.alert = true
      return recommendedDoses
    }

    for (let i=0; i< cereali.length;i++){
      if (cereals == cereali[i].nome){
        recommendedDoses.cereali = {
          nome: cereals,
          valore: weight * cereali[i].quantitàGrammiPerKgPeso
        }
        break
      }
    }

    if (!recommendedDoses.hasOwnProperty('cereali')){
      recommendedDoses.alert = true
      return recommendedDoses
    }

    for (let i=0; i< vitamine.length;i++){
      if (vitamins == vitamine[i].nome){
        recommendedDoses.vitamine = {
          nome: vitamins,
          valore: weight * vitamine[i].quantitàGrammiPerKgPeso
        }
        break
      }
    }

    if (!recommendedDoses.hasOwnProperty('vitamine')){
      recommendedDoses.alert = true
      return recommendedDoses
    }

    recommendedDoses.alert = false
    return recommendedDoses

  },
  generateFullRecommendations(petName, petRace, weigth, recommendedDoses){
    let result = {
      petName: petName,
      petRace: petRace,
      weigth: weigth,
      recommendedDoses: recommendedDoses,
      
    }

    const _proteineAlternatives = choices[petRace].proteine.filter(function(element){
      return element.nome != recommendedDoses.proteine.nome
    })
    const _cerealAlternatives = choices[petRace].cereali.filter(function(element){
      return element.nome != recommendedDoses.cereali.nome
    })
    const _vitamineAlternatives = choices[petRace].vitamine.filter(function(element){
      return element.nome != recommendedDoses.proteine.nome
    })

    let proteineAlternatives = []
    for (let i=0; i<_proteineAlternatives.length; i++){
      proteineAlternatives.push({
        nome: _proteineAlternatives[i].nome,
        valore: weigth * _proteineAlternatives[i].quantitàGrammiPerKgPeso
      })
    }

    result.proteineAlternatives = proteineAlternatives

    let cerealAlternatives = []
    for (let i=0; i<_cerealAlternatives.length; i++){
      cerealAlternatives.push({
        nome: _cerealAlternatives[i].nome,
        valore: weigth * _cerealAlternatives[i].quantitàGrammiPerKgPeso
      })
    }

    result.cerealAlternatives = cerealAlternatives

    let vitamineAlternatives = []
    for (let i=0; i<_vitamineAlternatives.length; i++){
      vitamineAlternatives.push({
        nome: _vitamineAlternatives[i].nome,
        valore: weigth * _vitamineAlternatives[i].quantitàGrammiPerKgPeso
      })
    }

    result.vitamineAlternatives = vitamineAlternatives

    return result
  }

  
};
