export function renderViewAsideT(data, dataPlant, dataPluvio){
    const divRender = document.querySelector('[aside-render]')
    // console.log(data, dataPluvio)

    const plots = dataPluvio.plots
    const active_plots = dataPluvio.active_harvest_plantations.length
    const totalPlots = plots + active_plots
   
    
    const html = 
    `
    <aside class="aside-container">
        <div class="first-section">
            <h2>Fazenda</h2>
            <h3 nome-fazenda>${data.farm.name}</h3>
            <p>${totalPlots} talhões</p>
            
            </div>
            
            <div class="second-section">
            <div class="first-row">
            <div class="col1">
            <h2>Data da visita</h2>
            <h3 data-visita>${data.details.date.split('-').reverse().join('/')}</h3>
            </div>
            <div class="col2">
            <h2>Safra</h2>
            <h3 data-safra>${data.harvest.name}</h3>
            </div>
            </div>
            <div class="second-coluna">
            <div class="second-coluna-row">
            <div class="textWrapper">
            <h2>Realizada por</h2>
            <h3 nome-proprietario>${data.owner.name}</h3>
            </div>
            <div class="JH">
            <span initials>
            ${data.owner.initials}
            </span>
            </div>
            </div>
            <div class="second-section-third-row">
            <h2>Pluviometria</h2>
            <h2><i class="fa fa-droplet"></i> ${dataPluvio.rain_until_date} mm</h2>
            <p>Acumulado na safra</p>
            </div>
            </div>
            </div>
            
            <div class="third-section">
            <h2>Observações</h2>
            <p obs>${data.details.observation}</p>
            </div>
            <div class="forth-section">
            <button data-imprimir><i class="fa fa-print"></i>
            <h2>IMPRIMIR</h2>
            </button>
            </div>
            </aside> 
            
            `;
            
            divRender.insertAdjacentHTML('afterbegin', html)
            document.querySelector('button').addEventListener('click', function(){
                alert('Pelo bem da sua impressora não tem como imprimir essa página 🙏')
            })

}
