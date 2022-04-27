import {getFazenda} from '../GetData.js'



export default async function renderViewAside(){
    const data = await getFazenda().then(res => res)
    
     const farmName = document.querySelector('[nome-fazenda]')
const dataVisita = document.querySelector('[data-visita]') 
const safraDate = document.querySelector('[data-safra]')
const observations = document.querySelector('[obs]')
const ownerName = document.querySelector('[nome-proprietario]')
const ownerInitials = document.querySelector('[initials]')

    farmName.textContent = data.farm.name
    dataVisita.textContent = data.details.date.split('-').reverse().join('/');
    safraDate.textContent = data.harvest.name
    observations.textContent = data.details.observation
    ownerName.textContent = data.owner.name
    ownerInitials.textContent = data.owner.initials
}
