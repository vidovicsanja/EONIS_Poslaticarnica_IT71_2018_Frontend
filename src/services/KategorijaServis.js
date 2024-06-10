export const getKategorije=async(ID, nazivKategorije)=>
{

    return await fetch('https://localhost:7186/api/kategorijaproizvoda/all', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
    }).then(response => response.json())


}
