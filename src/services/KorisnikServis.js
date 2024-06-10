
export const login = async (email, password) => {
    
    const data = {
        email: email,
        lozinka: password
    }
    
    return fetch('https://localhost:7186/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
} 

export const getCurrentUser = () => {
 
    return fetch('https://localhost:7186/api/korisnik/current', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(response => response.json())
}

export const registration=async(ime, prezime, email, brojTelefona, korisnickoIme, lozinka, uloga) =>
{
    const data = {
        ime: ime,
        prezime:prezime,
        email:email,
        brojTelefona:brojTelefona,
        korisnickoIme:korisnickoIme,
        lozinka: lozinka,
        uloga:uloga
    }
    
    return fetch('https://localhost:7186/api/korisnik/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())

}