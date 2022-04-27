async function getBosta(){

    const dataPlantations = await getNotesPlant('plantations').then(res2 => {
   
        return res2
    });
    

    dataPlantations.results.forEach(el => {
   
        renderCardTalhaoPlantations(el)
    })
}

getBosta()

function renderCardTalhaoPlantations (el) {
    
}




    // console.log(el)
    
    // if((el.hasOwnProperty('id') === true) && (el.hasOwnProperty('location') === false)){
    //     // console.log('id do plantation:', el.id)

     
    //     console.log('id', el.id)
    // }
    // if(el.hasOwnProperty('location') === true){
    //     // console.log('id do location', el.location.id)
    //     console.log('location.id', el.location.id)
    // }
 