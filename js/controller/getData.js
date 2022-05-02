import { getNotesPlant, getFazenda, getPluvio } from "../Fetch.js";
import { renderViewAsideT } from "../view/asideView.js";
import {renderDetalhesFazenda, renderTalhaoPlantationsHeaders, renderNotesTalhoes} from '../view/mainView.js'

export async function getFazendaNotes(){ //Pega os dados da fetch e chama as funções que renderizam na tela
    const dataNotes = await getNotesPlant('notes').then(res => {
        return res
    });

    const dataPlant = await getNotesPlant('plantations').then(res => {
        return res
    })
  
    const data = await getFazenda().then(res => {
        return res
    })

    const dataPluvio = await getPluvio().then(res => {
        return res
    })

   renderViewAsideT(data, dataPlant.results.length, dataPluvio)
    
    dataNotes.results.forEach((el, index) => {
        if(el.location_type === 'Farm'){
            renderDetalhesFazenda(el, index)
        }
     
    })

    dataPlant.results.forEach((el, index) => { 
        renderTalhaoPlantationsHeaders(el, index)
    })

    let arr = []
    dataNotes.results.forEach(el => [
        dataPlant.results.forEach(dataPlant => {
            if (el.location.id === dataPlant.id){
                arr.push(el)
            }
        })
    ])

    dataPlant.results.forEach((elt, index) => {
        arr.forEach(el => {
            if(el.location.id === elt.id){
                let currentId = el.location.id
                renderNotesTalhoes(el, currentId, index)
            }
        })
    })
}