
export async function getNotesPlant(resource){
    const cors = `https://justcors.com/tl_fba9df5`
    let url = `${cors}/https://farmbox.cc/api/public/technical_visit_report/${resource}.json?token=379238b5-705c-48bc-b8c9-27e26676b417` //aqui a url da requisição
 
    try{
        const res = await fetch(url)
        
        
        if(!res.ok) throw Error(err)
        
        const data = await res.json()
       
      
        return data
    }
    catch(err){
        console.error('deu ruim', err)
    }
}

export async function getFazenda(){   //pro aside
    const cors = `https://justcors.com/tl_fba9df5`
    let url = `${cors}/https://farmbox.cc/api/public/content_details.json?token=379238b5-705c-48bc-b8c9-27e26676b417` //aqui a url da requisição
 
    try{
        const res = await fetch(url)
        // console.log(res)

        if(!res.ok) throw Error(err)

        const data = await res.json()
        // console.log(data)
        return data
    }
    catch(err){
        return  console.log(err)
    }
}

export async function getPluvio(){   //pro aside
    const cors = `https://justcors.com/tl_fba9df5`
    let url = `${cors}/https://farmbox.cc/api/public/technical_visit_report/farm.json?token=379238b5-705c-48bc-b8c9-27e26676b417` //aqui a url da requisição
 
    try{
        const res = await fetch(url)
        // console.log(res)

        if(!res.ok) throw Error(err)

        const data = await res.json()
        // console.log(data)
        return data
    }
    catch(err){
        return  console.log(err)
    }
}







