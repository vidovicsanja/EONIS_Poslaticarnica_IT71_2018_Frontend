export const getSastojci=async(page, perPage)=>
{

    return fetch('https://localhost:7186/api/sastojak/all?page=' + page +'&perPage='+ perPage, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
    }).then(response => response.json())


}