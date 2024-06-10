export const stavkaPorudzbine=async(ID, Kolicina, Mera, PID, PPID)=>
{

    return fetch('https://localhost:7186/api/stavkaPorudzbine/all', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => response.json())


}

export const postStavkaPorudzbine=async(kolicina, mera)=>
{
    const data = {
        kolicina:kolicina,
        mera:mera
    }
    
    return fetch('https://localhost:7186/api/stavkaPorudzbine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())

}