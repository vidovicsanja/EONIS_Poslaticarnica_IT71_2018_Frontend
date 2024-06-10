export const getSastojciProizvoda=async(id, kolicinaSastojka, meraSastojka, prid, sid)=>
{

    return fetch('https://localhost:7186/api/sastojakProizvoda/all', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')


        },
    }).then(response => response.json())


}