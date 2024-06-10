import { useState } from "react"
import { login, getCurrentUser } from "../services/KorisnikServis"

const Login=()=>{

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [errors, setErrors] = useState([])

  const printErrors = (errors) => {

    let result = []

    for(let error of errors) {
      result.push(<p>{error}</p>)
    }

    return result
  }

  const loginClick = () => {
    
    console.log(email, password)

    setErrors([])
    let currentErrors = []
    

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const passwordRegex = /^(?=.*\d).{9,}$/;

    if(!emailRegex.test(email)) {
      currentErrors.push("Email nije validan")
    }

    if(!passwordRegex.test(password)) {
      currentErrors.push("Password nije validan")
    }
    

    if(currentErrors.length > 0) {
      setErrors(currentErrors)
      return
    }

    login(email, password).then(response => {
      localStorage.setItem('token', response.token)
      getCurrentUser().then(response => {
        console.log(response)
      })
    })
  }

return <section class="h-100 gradient-form" style={{backgroundColor: '#eee'}}>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-xl-10">
        <div class="card rounded-3 text-black">
          <div class="row g-0">
            <div class="col-lg-6">
              <div class="card-body p-md-5 mx-md-4">

                <div class="text-center">
                  <h4 class="mt-1 mb-5 pb-1">Poslasticarnica</h4>
                </div>
                <div>
                  {printErrors(errors)}
                </div>
                <form>
                  <p>Ulogujte se na svoj nalog</p>
                  
                  <div class="form-outline mb-4">
                    <input type="email" id="form2Example11" class="form-control"
                      placeholder="Phone number or email address" onChange={(e) => setEmail(e.target.value)}/>
                    <label class="form-label" for="form2Example11">Korisnicko ime</label>
                  </div>

                  <div class="form-outline mb-4">
                    <input type="password" id="form2Example22" class="form-control" onChange={(e) => setPassword(e.target.value)}/>
                    <label class="form-label" for="form2Example22" >Lozinka</label>
                  </div>

                  <div class="text-center pt-1 mb-5 pb-1">
                    <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button" onClick={() => loginClick()}>Log
                      in</button>
                    <a class="text-muted" href="#!">Zaboravljena lozinka?</a>
                  </div>

                  <div class="d-flex align-items-center justify-content-center pb-4">
                    <p class="mb-0 me-2">Jos uvek nemate nalog?</p>
                    <button type="button" class="btn btn-outline-danger">Registracija</button>
                  </div>
                </form>
              </div>
            </div>
            <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
              <div class="text-white px-3 py-4 p-md-5 mx-md-4">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
}

export default Login