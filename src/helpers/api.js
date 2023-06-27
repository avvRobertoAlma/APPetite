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
  getNutriscoreRanking(barcode, petType) {
    console.log("[API] Nutriscore per " +petType + " " + barcode)
    const product = nutriscoreRankings.find(function (el) {
      return el.barcode == barcode;
    });
    if (!product) {
      return null;
    }
    /* 
      il metodo Array.find restituisce un riferimento all'elemento corrente dell'array nel caso in cui sia un oggetto
      per cui per poter modificare a runtime il valore del punteggio se la combinazione è scorretta
      devo creare un nuovo oggetto che contenga gli stessi valori dell'oggetto restituito da find
      con la destrutturazione ossia i 3 puntini
      obj = { ...product } significa crea un oggetto dove tutte le proprietà sono le stesse di product con gli stessi valori
      ma è una copia non l'oggetto iniziale
      a questo punto posso modificare il punteggio e settarlo a zero se la combinazione animale barcode non è corretta
    */
    if (product.pet == petType){
      console.log('[API] prodotto ok')
      return { ...product }
    } else {
      console.log(`[API] Nutriscore animale corrente ${petType} animale desiderato ${product.pet}`)
      const prod = { ...product }
      prod.points = 0
      return prod
    }
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

    /* errors contiene la lista degli alimenti che il pet attivo non può mangiare */
    recommendedDoses.errors = []
    recommendedDoses.alert = false

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
      recommendedDoses.errors.push({
        tipo: 'proteine',
        nome: proteins
      })
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
      recommendedDoses.errors.push({
        tipo: 'cereali',
        nome: cereals
      })
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
      recommendedDoses.errors.push({
        tipo: 'vitamine',
        nome: vitamins
      })
    }

    
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
      return element.nome != recommendedDoses.vitamine.nome
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
