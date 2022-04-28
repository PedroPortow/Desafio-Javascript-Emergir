import {getNotesPlant, getFazenda, getPluvio} from './GetData.js'
import {renderViewAsideT }from './modules.js/aside.js'


// renderViewAside() //aside <-----------
// getFazendaNotes() //anotacoes da fazenda <---------------------------


function load(){
    window.onload = async () => {
        const load = document.querySelector('.load')
        const main = document.querySelector('#main')
        const title1 = document.querySelector('.outside-title-top')
        
        const html1 = 
        `
        <h2 class="outside-title-top">Anotações da fazenda</h2>
        
        `
        
        const html2 = `
        <h2 class="outside-title-talhao">Evento dos talhões</h2>
        `
        const divRenderTitle1 = document.querySelector('.main-cards-wrapper')
        const divRenderTitle2 = document.querySelector('[wrapperTalhoes]')
        const title2 = document.querySelector('.outside-title-talhao')
        main.style.display = 'none'
        
        
        
        
    
        if(document.readyState === 'complete'){
            try{
                divRenderTitle1.insertAdjacentHTML('afterbegin', html1)
                divRenderTitle2.insertAdjacentHTML('beforebegin', html2);
                await getFazendaNotes()
            }
            catch(err){
                console.error(err)
            }
            finally{
                main.style.display = ''
                load.style.display = 'none'
            }
        }
    }
}
load()
export async function getFazendaNotes(){
    const dataNotes = await getNotesPlant('notes').then(res => {
        return res
    });

    const dataPlant = await getNotesPlant('plantations').then(res => {
        return res
    })

    // const dataFazenda = await getFazenda().then(res => {
    //     return res
    // })
  
    const data = await getFazenda().then(res => {
        return res
    })

    const dataPluvio = await getPluvio().then(res => {
        return res
    })

   
   renderViewAsideT(data, dataPlant.results.length, dataPluvio)
    
 

    dataNotes.results.forEach((el, index) => {
        // console.log(el)
        if(el.location_type === 'Farm'){
                // console.log(el.description)
            renderDetalhesFazenda(el, index)
        }
     
    })

    // renderViewAsideT(dataFazenda)
    dataPlant.results.forEach((el, index) => { 
        // console.log(index, el)
        renderTalhaoPlantationsHeaders(el, index)
       
    })

    let arr = []
    dataNotes.results.forEach(el => [
        dataPlant.results.forEach(dataPlant => {
            if (el.location.id === dataPlant.id){
                arr.push(el)
                // console.log(arr)
            }
        })
    ])

    dataPlant.results.forEach((elt, index) => {
        let verify = false
        // console.log(index)
        arr.forEach(el => {
            if(el.location.id === elt.id){
                // verify = true
                let currentId = el.location.id
               
               

                renderNotesTalhoes(el, currentId, index)
                
            }
        })
    })

  
}

function renderDetalhesFazenda(el, index){
    const cardRowFarm = document.querySelector('.card-row') //row q vai ser adicionada
        const html1 = 
    `
    <h2 class="outside-title-top">Anotações da fazenda</h2>
    
    `
    

    if(el.attachments.images.length > 0){
        const urls = []
        el.attachments.images.forEach( el => {
            urls.push(el.thumb_url)
        })
        const cardNotesFarm =
        `
        <div class="container-anotacao">
            <h2><i class="fa fa-pencil"></i>Anotação</h2>
            <div class="image-row">
                ${urls.map(e => `<img src="${e}" alt="img">`).join("")}
            </div>
            <p>${el.description}</p>
        </div>
        `
        cardRowFarm.insertAdjacentHTML('afterbegin', cardNotesFarm)
        
    }
    else{
        const cardNotesFarm =
        `
        <div class="container-anotacao">
        <h2><i class="fa fa-pencil"></i>Anotação</h2>
        <div class="image-row">
        
        </div>
        <p>${el.description}</p>
        </div>
        `
        cardRowFarm.insertAdjacentHTML('afterbegin', cardNotesFarm)
    }
   }



/////////////////////////////////////////////////////////


function renderTalhaoPlantationsHeaders(el, index){
    // console.log(el)
    
    console.log(el, index)

        
        const wrapperTalhoes = document.querySelector('[wrapperTalhoes]')
        const talhaoContent = document.querySelector('[talhaoContent]')

        const html = 
        `
        <div class="container-100w">
            <div class="container-100w-first-section">
                <h2 nome-ciclo>${el.name} <span>${el.cycle}º ciclo</span></h2>
                <p>${el.variety.name} - ${el.area} Ha</p>
                <span>Plantado</span>
            </div>
            <div class="container-100w-second-section">
                <div class="row">
                    <h3>Data de plantio</h3>
                    <p>${el.date.split('-').reverse().join('/')}</p>
                </div>
                <div class="row">
                    <h3>Emergência</h3>
                    <p>${el.emergence_date ? el.emergence_date.split('-').reverse().join('/') : 'Não há data :('}</p>
                </div>
                <div class="row">
                    <h3>Colheita</h3>
                    <p>${el.harvest_prediction_date.split('-').reverse().join('/')}</p>
                </div>
            </div>
            <div class="container-100w-third-section">
                ${index === 0 ? ` <i class="fa-solid fa-angle-up" arrows-data${el.id}></i>`: ` <i class="fa-solid fa-angle-down" arrows-data${el.id}></i>` }
            </div>
        </div> 
        <div class="rowz"  id-atribute${el.id}>
        </div>
        `
        
        if(el){ //se tiver talhão na api renderiza
            wrapperTalhoes.insertAdjacentHTML('beforebegin', html)
        }
        


}


function renderNotesTalhoes(el, currentId, index){

    const card100w = document.querySelector('.container-100w')
    const divRender = document.querySelector(`[id-atribute${currentId}]`)
    
    const arrow = document.querySelectorAll(`[arrows-data${currentId}]`).forEach(arrow => {
        arrow.addEventListener('click', function(){ 
                arrow.classList.toggle('rotateimg180')

                if(arrow.classList.contains('rotateimg180') || divRender.classList.contains('active')){
                    hide()
                }
                else{
                    appear()
                }   
        })  
    })

    function hide(){
        divRender.classList.toggle('inactive')
    }

    function appear(){
        divRender.classList.toggle('inactive')
    }
 

    if(el){
        if(index === 0){
            if(el.location.id)
             if(el.attachments.images.length > 0){
                 const urls = []
                 el.attachments.images.forEach( el => {
                     urls.push(el.thumb_url)
                 })
        
                 const cardNotesFarm =
                 ` 
                 <div class="card-row">
                     <div class="container-anotacao">
                         <h2><i class="fa fa-pencil"></i>Anotação</h2>
                         <div class="image-row">
                             ${urls.map(e => `<img src="${e}" alt="img">`).join("")}
                         </div>
                         <p>${el.description}</p>
                     </div>
                 </div>
                 `
                 divRender.insertAdjacentHTML('afterbegin', cardNotesFarm)
        
             }
             else{
                 const cardNotesFarm =
                 `
                 <div class="card-row">
                     <div class="container-anotacao">
                         <h2><i class="fa fa-pencil"></i>Anotação</h2>
                         <div class="image-row">
        
                         </div>
                         <p>${el.description === undefined ? '' : el.description }</p>
                     </div>
                 </div>
                 `
                 divRender.insertAdjacentHTML('afterbegin', cardNotesFarm)
             }
        }
        
    
        else if(index > 0){
            divRender.classList.toggle('inactive')
            if(el.location.id)
             if(el.attachments.images.length > 0){
                 const urls = []
                 el.attachments.images.forEach( el => {
                     urls.push(el.thumb_url)
                 })
        
                 const cardNotesFarm =
                 `
                 <div class="card-row">
                     <div class="container-anotacao">
                         <h2><i class="fa fa-pencil"></i>Anotação</h2>
                         <div class="image-row">
                             ${urls.map(e => `<img src="${e}" alt="img">`).join("")}
                         </div>
                         <p>${el.description}</p>
                     </div>
                 </div>
                 `
                 divRender.insertAdjacentHTML('afterbegin', cardNotesFarm)
        
             }
             else{
                 const cardNotesFarm =
                 `
                 <div class="card-row">
                     <div class="container-anotacao">
                         <h2><i class="fa fa-pencil"></i>Anotação</h2>
                         <div class="image-row">
        
                         </div>
                         <p>${el.description === undefined ? '' : el.description }</p>
                     </div>
                 </div>
                 `
                 divRender.insertAdjacentHTML('afterbegin', cardNotesFarm)
             }
        }
    }
  

}

