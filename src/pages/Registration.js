import {useState} from "react"
import {registration} from "../services/KorisnikServis"
const Registration=()=>
{       
          const [ime, setIme] = useState()
          const [prezime, setPrezime] = useState()
          const [email, setEmail]=useState()
          const [brTelefona, setBrTelefona]=useState()
          const [korisnickoIme, setKorisnickoIme]=useState()
          const [lozinka, setLozinka]=useState()
          const [uloga, setUloga]=useState()
          const [errors, setErrors]=useState([])

        const printError = (errors)=>{
          let result =[]

          for(let error of errors){
            result.push(<p>{error}</p>)
          }
        }

        const registerClick = () => {


            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            const passwordRegex = /^(?=.*\d).{9,}$/;
            const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
            const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

            setErrors([])
            let currentErrors=[]

              if(!emailRegex.test(email)) {
                currentErrors.push("Email nije validan")
              }
          
              if(!passwordRegex.test(lozinka)) {
                currentErrors.push("Password nije validan")
              }

              if(!emailRegex.test(ime)) {
                currentErrors.push("Ime mora biti uneto")
              }
          
              if(!passwordRegex.test(prezime)) {
                currentErrors.push("Prezime mora biti uneto")
              }

              if(!emailRegex.test(korisnickoIme)) {
                currentErrors.push("Korisnicko ime nije uneto")
              }
          
              if(!passwordRegex.test(brTelefona)) {
                currentErrors.push("Broj telefona nije unet")
              }
          
              if(currentErrors.length > 0) {
                setErrors(currentErrors)
                return
              }

              console.log(ime, prezime, email, brTelefona, korisnickoIme, lozinka, uloga)
              registration(ime, prezime, email, brTelefona, korisnickoIme, lozinka, uloga).then(response => 
                console.log(response)
              )

  }

    return <section class="vh-100" style={{backgroundColor: '#eee'}}>
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style={{borderRadius: '25px'}}>
          <div class="text-center">
                      <h4 class="mt-1 mb-5 pb-1">Poslasticarnica</h4>
                    </div>
                    <div>
                  {printError(errors)}
                </div>
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                  <form class="mx-1 mx-md-4">
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="text" id="form3Example1c" class="form-control" onChange={(e) => setIme(e.target.value)} />
                        <label class="form-label" for="form3Example1c">Ime</label>
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="email" id="form3Example3c" class="form-control" onChange={(e) => setPrezime(e.target.value)}/>
                        <label class="form-label" for="form3Example3c">Prezime</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="text" id="form3Example1c" class="form-control" onChange={(e) => setEmail(e.target.value)} />
                        <label class="form-label" for="form3Example1c">Email</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="text" id="form3Example1c" class="form-control" onChange={(e) => setBrTelefona(e.target.value)}/>
                        <label class="form-label" for="form3Example1c">Broj telefona</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="text" id="form3Example1c" class="form-control" onChange={(e) => setKorisnickoIme(e.target.value)}/>
                        <label class="form-label" for="form3Example1c">Korisnicko ime</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" class="form-control" onChange={(e) => setLozinka(e.target.value)}/>
                      <label class="form-label" for="form3Example4c">Lozinka</label>
                    </div>
                  </div>


                  <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="text" id="form3Example1c" class="form-control" onChange={(e) => setUloga(e.target.value)} />
                        <label class="form-label" for="form3Example1c">Uloga</label>
                      </div>
                    </div>

                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="button" onClick={() => registerClick()}class="btn btn-primary btn-lg">Register</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
}

export default Registration