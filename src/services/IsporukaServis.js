export const isporuka=async(ID, DatumVremeIsporuke)=>
{

    return fetch('https://localhost:7186/api/isporuka/all', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => response.json())


}