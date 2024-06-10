export const getProizvodi=async(page, perPage)=>
{

    return await fetch('https://localhost:7186/api/proizvod/all?page=' + page +'&perPage='+ perPage, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
    }).then(response => response.json())


}

export const getNazivProizvoda=async(name)=>
{
    return await fetch('https://localhost:7186/api/proizvod/name/{name}', {
        method:'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization':'Bearer'+localStorage.getItem('token')
        },

    }).then(response=>response.json())
}

export const postProizvodi=async(ID, nazivProizvoda, opis, cena, idkp)=>
{
    const data = {
        ID: ID,
        nazivProizvoda:nazivProizvoda,
        opis:opis,
        cena:cena,
        idkp:idkp
    }
    
    return fetch('https://localhost:7186/api/proizvodi', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())

}

export const putProizvodi=async(ID, nazivProizvoda, opis, cena, idkp)=>
{
    const data = {
        ID: ID,
        nazivProizvoda:nazivProizvoda,
        opis:opis,
        cena:cena,
        idkp:idkp
    }
    
    return fetch('https://localhost:7186/api/proizvodi', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())

}
