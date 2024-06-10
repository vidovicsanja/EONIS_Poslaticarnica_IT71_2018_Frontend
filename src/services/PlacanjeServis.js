export const placanje=async(placanjeID, iznos, placeno, valuta)=>
{

    return fetch('https://localhost:7186/api/placanje/all', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => response.json())


}