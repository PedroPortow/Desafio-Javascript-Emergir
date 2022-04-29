import {getFazendaNotes} from './modules.js/getData.js'


function load(){
    window.onload = async () => {
        const load = document.querySelector('.load')
        const main = document.querySelector('#main')
        
        const html1 = 
        `
        <h2 class="outside-title-top">Anotações da fazenda</h2>
        `
        
        const html2 = `
        <h2 class="outside-title-talhao">Evento dos talhões</h2>
        `
        
        const divRenderTitle1 = document.querySelector('.main-cards-wrapper')
        const divRenderTitle2 = document.querySelector('[wrapperTalhoes]')
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
