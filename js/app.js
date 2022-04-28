import {getNotesPlant} from './GetData.js'
import renderViewAside from './modules.js/aside.js'


renderViewAside() //aside <-----------
getFazendaNotes() //anotacoes da fazenda <---------------------------

export async function getFazendaNotes(){
    const dataNotes = await getNotesPlant('notes').then(res => {
        return res
    });

    const dataPlant = await getNotesPlant('plantations').then(res => {
        return res
    })


    dataNotes.results.forEach(el => {
        // console.log(el)
        if(el.location_type === 'Farm'){
                // console.log(el.description)
            renderDetalhesFazenda(el)
        }
     
    })

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
                // console.log(currentId)
               

                renderNotesTalhoes(el, currentId, index)
            }
        })
    })
}

function renderDetalhesFazenda(el){
    const cardRowFarm = document.querySelector('.card-row') //row q vai ser adicionada
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
                <i class="fa-solid fa-angle-down" arrows-data${el.id}></i>
            </div>
        </div>
        <div class="rowz"  id-atribute${el.id}>
        </div>
        `
        
        wrapperTalhoes.insertAdjacentHTML('beforebegin', html)
    
   


}


function renderNotesTalhoes(el, currentId, index){
    // console.log(currentId) 
    // console.log(el)
    // console.log(index)

   
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






/////////////ta aq
// if(el){
//     if(el.location.id)
//      if(el.attachments.images.length > 0){
//          const urls = []
//          el.attachments.images.forEach( el => {
//              urls.push(el.thumb_url)
//          })

//          const cardNotesFarm =
//          `
//          <div class="card-row">
//              <div class="container-anotacao">
//                  <h2><i class="fa fa-pencil"></i>Anotação</h2>
//                  <div class="image-row">
//                      ${urls.map(e => `<img src="${e}" alt="img">`).join("")}
//                  </div>
//                  <p>${el.description}</p>
//              </div>
//          </div>
//          `
//          divRender.insertAdjacentHTML('afterbegin', cardNotesFarm)

//      }
//      else{
//          const cardNotesFarm =
//          `
//          <div class="card-row">
//              <div class="container-anotacao">
//                  <h2><i class="fa fa-pencil"></i>Anotação</h2>
//                  <div class="image-row">

//                  </div>
//                  <p>${el.description === undefined ? '' : el.description }</p>
//              </div>
//          </div>
//          `
//          divRender.insertAdjacentHTML('afterbegin', cardNotesFarm)
//      }
//  }
