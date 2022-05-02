
const cors = `https://justcors.com/tl_0e09ddc/`
const token = '379238b5-705c-48bc-b8c9-27e26676b417'

export async function getNotesPlant(resource){
    
    let url = `${cors}https://farmbox.cc/api/public/technical_visit_report/${resource}.json?token=${token}` //aqui a url da requisição
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
    let url = `${cors}https://farmbox.cc/api/public/content_details.json?token=${token}` //aqui a url da requisição
    try{
        const res = await fetch(url)

        if(!res.ok) throw Error(err)
        const data = await res.json()
      
        return data
    }
    catch(err){
        return  console.log(err)
    }
}

export async function getPluvio(){   //pro aside
    
    let url = `${cors}https://farmbox.cc/api/public/technical_visit_report/farm.json?token=${token}` //aqui a url da requisição
 
    try{
        const res = await fetch(url)

        if(!res.ok) throw Error(err)

        const data = await res.json()
        return data
    }
    catch(err){
        return  console.log(err)
    }
}







