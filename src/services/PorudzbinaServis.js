export const getPorudzbina=async(ID, DatumVremePorudzbine, KID)=>
{

    return fetch('https://localhost:7186/api/porudzbina/all', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
    }).then(response => response.json())

}

export const postPorudzbina=async(ID, DatumVremePorudzbine, KID)=>
{
    const data={
        ID:ID,
        DatumVremePorudzbine:DatumVremePorudzbine,
        KID:KID
    }

    return fetch('https://localhost:7186/api/porudzbina', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
}


